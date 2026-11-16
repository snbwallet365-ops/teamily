import Foundation
import SwiftUI

@MainActor
final class Store: ObservableObject {
    @Published var vault: Vault
    @Published var activeChatID: String?
    @Published var typingChatID: String?
    @Published var toast: String?

    init() {
        if let data = try? Data(contentsOf: Store.fileURL()),
           let decoded = try? JSONDecoder().decode(Vault.self, from: data) {
            vault = decoded
        } else {
            vault = Store.seed()
        }
    }

    // MARK: - Persistence

    static func fileURL() -> URL {
        let base = FileManager.default.urls(for: .applicationSupportDirectory, in: .userDomainMask).first
            ?? FileManager.default.temporaryDirectory
        try? FileManager.default.createDirectory(at: base, withIntermediateDirectories: true)
        return base.appendingPathComponent("visa-agent-vault.json")
    }

    func persist() {
        do {
            let data = try JSONEncoder().encode(vault)
            try data.write(to: Store.fileURL(), options: .atomic)
        } catch {
            print("save failed", error)
        }
    }

    // MARK: - Lookups

    func agent(_ id: String) -> Agent? {
        vault.agents.first { $0.id == id }
    }

    func chat(_ id: String) -> Chat? {
        vault.chats.first { $0.id == id }
    }

    func chat(forAgent agentID: String) -> Chat? {
        vault.chats.first { $0.agentID == agentID }
    }

    var unreadTotal: Int {
        vault.chats.reduce(0) { $0 + $1.unread }
    }

    func agentName(for chat: Chat) -> String {
        agent(chat.agentID)?.name ?? "Visa agent"
    }

    // MARK: - Chats

    func openChat(withAgent agentID: String) {
        if let existing = chat(forAgent: agentID) {
            open(existing.id)
            return
        }
        let fresh = Chat(id: UUID().uuidString, agentID: agentID, unread: 0,
                         updatedAt: Date(), messages: [])
        vault.chats.insert(fresh, at: 0)
        persist()
        open(fresh.id)
    }

    func open(_ chatID: String) {
        activeChatID = chatID
        if let index = vault.chats.firstIndex(where: { $0.id == chatID }) {
            vault.chats[index].unread = 0
            persist()
        }
    }

    func closeChat() {
        activeChatID = nil
    }

    func flash(_ message: String) {
        toast = message
        Task {
            try? await Task.sleep(nanoseconds: 2_600_000_000)
            if toast == message { toast = nil }
        }
    }

    func send(_ text: String, in chatID: String) async {
        let clean = text.trimmingCharacters(in: .whitespacesAndNewlines)
        guard !clean.isEmpty,
              let index = vault.chats.firstIndex(where: { $0.id == chatID }) else { return }

        vault.chats[index].messages.append(Message(mine: true, text: clean))
        vault.chats[index].updatedAt = Date()
        vault.chats[index].unread = 0
        typingChatID = chatID
        persist()

        let history = vault.chats[index].messages
        let agentID = vault.chats[index].agentID

        try? await Task.sleep(nanoseconds: 650_000_000)

        var reply = ""
        if !vault.apiKey.isEmpty, let modelReply = await aiReply(agentID: agentID, history: history) {
            reply = modelReply
        } else {
            reply = localReply(agentID: agentID, text: clean)
        }

        if let now = vault.chats.firstIndex(where: { $0.id == chatID }) {
            vault.chats[now].messages.append(Message(mine: false, text: reply))
            vault.chats[now].updatedAt = Date()
            if activeChatID != chatID { vault.chats[now].unread += 1 }
            persist()
        }
        typingChatID = nil
    }

    // MARK: - Live AI (xAI Grok by default, any OpenAI compatible endpoint via model field)

    func aiReply(agentID: String, history: [Message]) async -> String? {
        let key = vault.apiKey.trimmingCharacters(in: .whitespacesAndNewlines)
        guard !key.isEmpty else { return nil }

        let persona = agent(agentID)
        let system = """
        You are \(persona?.name ?? "Visa advisor"), a \(persona?.role ?? "visa specialist") inside Visa Agent.
        \(persona?.summary ?? "")
        Help with visa applications: documents, timelines, embassy rules, cover letters and interviews.
        Be practical and accurate, ask for the missing fact when it matters, and reply in the applicant's language.
        Keep answers under 130 words unless a checklist is asked for.
        """

        var messages: [[String: String]] = [["role": "system", "content": system]]
        for item in history.suffix(12) {
            messages.append(["role": item.mine ? "user" : "assistant", "content": item.text])
        }

        let model = vault.model.isEmpty ? "grok-4" : vault.model
        let body: [String: Any] = ["model": model, "messages": messages, "temperature": 0.6]

        guard let url = URL(string: "https://api.x.ai/v1/chat/completions") else { return nil }
        var request = URLRequest(url: url)
        request.httpMethod = "POST"
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        request.setValue("Bearer \(key)", forHTTPHeaderField: "Authorization")
        request.httpBody = try? JSONSerialization.data(withJSONObject: body)

        do {
            let (data, response) = try await URLSession.shared.data(for: request)
            guard let http = response as? HTTPURLResponse, (200...299).contains(http.statusCode) else {
                flash("AI error \((response as? HTTPURLResponse)?.statusCode ?? 0). Local reply used.")
                return nil
            }
            if let json = try? JSONSerialization.jsonObject(with: data) as? [String: Any],
               let choices = json["choices"] as? [[String: Any]],
               let first = choices.first,
               let message = first["message"] as? [String: Any],
               let content = message["content"] as? String {
                return content.trimmingCharacters(in: .whitespacesAndNewlines)
            }
            return nil
        } catch {
            flash("Network error. Local reply used.")
            return nil
        }
    }

    // MARK: - Offline brain (works with no key)

    func localReply(agentID: String, text: String) -> String {
        let lower = text.lowercased()
        let name = agent(agentID)?.name ?? "Visa agent"

        if lower.contains("saudi") || lower.contains("gulf") || lower.contains("umrah") || lower.contains("hajj") {
            return "Saudi visit visa: passport valid 6+ months with two blank pages, white background photos (35x45mm), confirmed return ticket, hotel booking, 3 to 6 months bank statement, NID copy and a short cover letter. Processing is usually 3 to 7 working days. Want the checklist saved to Artifacts?"
        }
        if lower.contains("schengen") || lower.contains("europe") {
            return "Schengen short stay: passport, photos, travel insurance with 30,000 EUR cover, flight and hotel bookings, bank statements for 3 to 6 months, employment letter, and a day by day itinerary. Apply at the consulate of your main destination, up to 6 months ahead."
        }
        if lower.contains("uk") || lower.contains("britain") || lower.contains("london") {
            return "UK standard visitor: online application, biometrics appointment, 6 months bank statements, payslips, employer letter, accommodation and travel plan, plus ties to your home country. Decision usually takes 3 weeks."
        }
        if lower.contains("canada") || lower.contains("usa") || lower.contains("america") {
            return "Canada or US visitor: passport, photo, application form, proof of funds, travel history, invitation letter if any, and a clear purpose of visit. Biometrics are required, and interviews apply for the US."
        }
        if lower.contains("australia") || lower.contains("new zealand") {
            return "Australia visitor (subclass 600): passport, photo, funds evidence, itinerary, employment proof and health insurance. Apply online, and allow 20 to 40 days for a decision."
        }
        if lower.contains("checklist") || lower.contains("document") || lower.contains("kagoj") || lower.contains("document") {
            return "I build checklists per country: identity, financial, employment, travel and purpose documents. Tell me the country and purpose of travel and I will produce the exact list."
        }
        if lower.contains("appointment") || lower.contains("biometric") {
            return "For appointments I track embassy slots, biometrics centres and document deadlines. Share the city and country and I will outline the booking order and what to carry."
        }
        if lower.contains("interview") {
            return "Interview prep: know your itinerary, funding source, employer, and ties back home. I can run a mock interview with the ten most common questions and score your answers."
        }
        if lower.contains("cover letter") || lower.contains("letter") {
            return "I draft cover letters: purpose, dates, funding, accommodation and return intent in one page. Give me the applicant name, destination, dates and sponsor, and I will write it."
        }
        return "As \(name) I would start with three facts: destination and visa type, travel dates, and who pays. Give me those and I will produce the document list, timeline and the next action."
    }
}
