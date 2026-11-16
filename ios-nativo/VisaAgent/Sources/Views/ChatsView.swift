import SwiftUI

func ago(_ date: Date) -> String {
    let seconds = Int(Date().timeIntervalSince(date))
    if seconds < 60 { return "now" }
    if seconds < 3600 { return "\(seconds / 60)m" }
    if seconds < 86400 { return "\(seconds / 3600)h" }
    return "\(seconds / 86400)d"
}

struct ChatsView: View {
    @EnvironmentObject private var store: Store

    private var ordered: [Chat] {
        store.vault.chats.sorted { $0.updatedAt > $1.updatedAt }
    }

    var body: some View {
        VStack(spacing: 12) {
            hero
            ForEach(ordered) { chat in
                Button {
                    store.open(chat.id)
                } label: {
                    chatRow(chat)
                }
                .buttonStyle(PressableStyle())
            }
            if ordered.isEmpty {
                Text("No conversations yet. Open an agent to start.")
                    .font(.system(size: 13))
                    .foregroundColor(Theme.faint)
                    .frame(maxWidth: .infinity)
                    .padding(.vertical, 30)
            }
        }
    }

    private var hero: some View {
        VStack(alignment: .leading, spacing: 12) {
            HStack(spacing: 8) {
                Circle().fill(Theme.mint).frame(width: 8, height: 8)
                Text("Your visa team is live")
                    .font(.system(size: 15, weight: .semibold))
                    .foregroundColor(Theme.ink)
                Spacer()
                Text("\(store.vault.agents.count) agents")
                    .font(.system(size: 11.5, weight: .semibold))
                    .foregroundColor(Theme.violet)
                    .padding(.horizontal, 9)
                    .padding(.vertical, 4)
                    .background(Theme.violet.opacity(0.12), in: Capsule())
            }
            Text("Files, checklists, appointments and letters handled by specialists.")
                .font(.system(size: 12.8))
                .foregroundColor(Theme.dim)
                .fixedSize(horizontal: false, vertical: true)
            Button {
                if let first = store.vault.agents.first {
                    store.openChat(withAgent: first.id)
                }
            } label: {
                Label("Start a new case chat", systemImage: "plus.bubble.fill")
            }
            .buttonStyle(GradientButtonStyle())
        }
        .padding(16)
        .glass()
    }

    private func chatRow(_ chat: Chat) -> some View {
        let agent = store.agent(chat.agentID)
        let last = chat.messages.last
        return HStack(spacing: 12) {
            ZStack {
                RoundedRectangle(cornerRadius: 15, style: .continuous)
                    .fill(Theme.wash(Theme.tint(agent?.tint ?? 0)))
                Image(systemName: agent?.icon ?? "person.text.rectangle.fill").font(.system(size: 20, weight: .semibold)).foregroundColor(Theme.violet)
            }
            .frame(width: 46, height: 46)
            .overlay(
                RoundedRectangle(cornerRadius: 15, style: .continuous)
                    .stroke(Color.white.opacity(0.8), lineWidth: 1)
            )

            VStack(alignment: .leading, spacing: 3) {
                HStack(spacing: 6) {
                    Text(agent?.name ?? "Visa agent")
                        .font(.system(size: 14.5, weight: .semibold))
                        .foregroundColor(Theme.ink)
                        .lineLimit(1)
                    Spacer()
                    Text(ago(chat.updatedAt))
                        .font(.system(size: 11, weight: .medium))
                        .foregroundColor(Theme.faint)
                }
                Text(last?.text ?? "Say hello to start")
                    .font(.system(size: 12.6))
                    .foregroundColor(Theme.dim)
                    .lineLimit(2)
                    .multilineTextAlignment(.leading)
            }

            if chat.unread > 0 {
                Text("\(chat.unread)")
                    .font(.system(size: 11, weight: .bold))
                    .foregroundColor(.white)
                    .frame(width: 20, height: 20)
                    .background(Theme.brand, in: Circle())
            }
        }
        .padding(12)
        .glass(radius: 20)
    }
}

struct ChatDetailView: View {
    @EnvironmentObject private var store: Store
    @Environment(\.dismiss) private var dismiss
    let chatID: String
    @State private var draft = ""

    private var chat: Chat? { store.chat(chatID) }
    private var agent: Agent? { chat.flatMap { store.agent($0.agentID) } }

    var body: some View {
        ZStack {
            BackgroundView()
            VStack(spacing: 0) {
                header
                Divider().opacity(0.35)
                messages
                composer
            }
        }
    }

    private var header: some View {
        HStack(spacing: 12) {
            Button { dismiss() } label: {
                Image(systemName: "chevron.left")
                    .font(.system(size: 16, weight: .bold))
                    .foregroundColor(Theme.ink)
                    .frame(width: 38, height: 38)
                    .background(.ultraThinMaterial, in: Circle())
            }
            .buttonStyle(PressableStyle())

            ZStack {
                RoundedRectangle(cornerRadius: 14, style: .continuous)
                    .fill(Theme.wash(Theme.tint(agent?.tint ?? 0)))
                Image(systemName: agent?.icon ?? "person.text.rectangle.fill").font(.system(size: 18, weight: .semibold)).foregroundColor(Theme.violet)
            }
            .frame(width: 42, height: 42)

            VStack(alignment: .leading, spacing: 2) {
                Text(agent?.name ?? "Visa agent")
                    .font(.system(size: 15, weight: .semibold))
                    .foregroundColor(Theme.ink)
                    .lineLimit(1)
                HStack(spacing: 5) {
                    Circle().fill(Theme.mint).frame(width: 6, height: 6)
                    Text(store.typingChatID == chatID ? "typing" : "online, replies fast")
                        .font(.system(size: 11.5, weight: .medium))
                        .foregroundColor(Theme.dim)
                }
            }
            Spacer()
        }
        .padding(.horizontal, 16)
        .padding(.top, 12)
        .padding(.bottom, 10)
    }

    private var messages: some View {
        ScrollViewReader { proxy in
            ScrollView(showsIndicators: false) {
                VStack(spacing: 10) {
                    ForEach(chat?.messages ?? []) { message in
                        bubble(message).id(message.id)
                    }
                    if store.typingChatID == chatID {
                        HStack(spacing: 5) {
                            ForEach(0..<3) { index in
                                Circle()
                                    .fill(Theme.faint.opacity(0.6))
                                    .frame(width: 6, height: 6)
                                    .opacity(0.4 + Double(index) * 0.2)
                            }
                            Spacer()
                        }
                        .padding(.leading, 14)
                    }
                    Color.clear.frame(height: 1).id("bottom")
                }
                .padding(.horizontal, 16)
                .padding(.vertical, 12)
            }
            .onChange(of: chat?.messages.count ?? 0) { _ in
                withAnimation(.easeOut(duration: 0.25)) {
                    proxy.scrollTo("bottom", anchor: .bottom)
                }
            }
        }
    }

    private func bubble(_ message: Message) -> some View {
        HStack {
            if message.mine { Spacer(minLength: 50) }
            Text(message.text)
                .font(.system(size: 14.2))
                .foregroundColor(message.mine ? .white : Theme.ink)
                .padding(.horizontal, 14)
                .padding(.vertical, 10)
                .background {
                    if message.mine {
                        RoundedRectangle(cornerRadius: 18, style: .continuous).fill(Theme.brand)
                    } else {
                        RoundedRectangle(cornerRadius: 18, style: .continuous)
                            .fill(Color.white.opacity(0.9))
                            .overlay(RoundedRectangle(cornerRadius: 18, style: .continuous)
                                .stroke(Color.white, lineWidth: 1))
                    }
                }
                .shadow(color: Theme.ink.opacity(0.06), radius: 8, x: 0, y: 4)
            if !message.mine { Spacer(minLength: 50) }
        }
    }

    private var composer: some View {
        HStack(spacing: 10) {
            TextField("Ask about a visa file", text: $draft, axis: .vertical)
                .font(.system(size: 14.5))
                .lineLimit(1...4)
                .padding(.horizontal, 14)
                .padding(.vertical, 11)
                .background(Color.white.opacity(0.9), in: Capsule())
                .overlay(Capsule().stroke(Color.white, lineWidth: 1))

            Button {
                let text = draft
                draft = ""
                Task { await store.send(text, in: chatID) }
            } label: {
                Image(systemName: "arrow.up")
                    .font(.system(size: 16, weight: .bold))
                    .foregroundColor(.white)
                    .frame(width: 44, height: 44)
                    .background(Theme.brand, in: Circle())
                    .shadow(color: Theme.violet.opacity(0.4), radius: 12, x: 0, y: 8)
            }
            .buttonStyle(PressableStyle())
            .disabled(draft.trimmingCharacters(in: .whitespaces).isEmpty)
        }
        .padding(.horizontal, 16)
        .padding(.vertical, 10)
        .background(.ultraThinMaterial)
    }
}
