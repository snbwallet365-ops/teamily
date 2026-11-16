import Foundation

struct Agent: Identifiable, Codable, Hashable {
    var id: String
    var name: String
    var icon: String
    var role: String
    var summary: String
    var skills: [String]
    var tint: Int
    var pinned: Bool
}

struct Message: Identifiable, Codable, Hashable {
    var id: String = UUID().uuidString
    var mine: Bool
    var text: String
    var at: Date = Date()
}

struct Chat: Identifiable, Codable, Hashable {
    var id: String
    var agentID: String
    var unread: Int
    var updatedAt: Date
    var messages: [Message]
}

struct Team: Identifiable, Codable, Hashable {
    var id: String
    var name: String
    var icon: String
    var summary: String
    var memberIDs: [String]
}

struct Automation: Identifiable, Codable, Hashable {
    var id: String
    var name: String
    var schedule: String
    var prompt: String
    var agentID: String
    var isOn: Bool
    var lastRun: Date?
}

struct MemoryItem: Identifiable, Codable, Hashable {
    var id: String
    var key: String
    var value: String
}

struct ArtifactItem: Identifiable, Codable, Hashable {
    var id: String
    var icon: String
    var title: String
    var body: String
    var at: Date
}

struct Vault: Codable {
    var agents: [Agent]
    var chats: [Chat]
    var teams: [Team]
    var automations: [Automation]
    var memories: [MemoryItem]
    var artifacts: [ArtifactItem]
    var darkMode: Bool
    var apiKey: String
    var model: String
}

enum AppSection: String, CaseIterable, Identifiable {
    case chats, agents, teams, automations, discover, memory, artifacts

    var id: String { rawValue }

    var title: String {
        switch self {
        case .chats: return "Chats"
        case .agents: return "Agents"
        case .teams: return "Agent Teams"
        case .automations: return "Automations"
        case .discover: return "Discover"
        case .memory: return "Memory"
        case .artifacts: return "Artifacts"
        }
    }

    var subtitle: String {
        switch self {
        case .chats: return "Live visa conversations"
        case .agents: return "Your visa specialists"
        case .teams: return "Grouped case work"
        case .automations: return "Scheduled visa jobs"
        case .discover: return "Add new specialists"
        case .memory: return "Applicant facts"
        case .artifacts: return "Saved documents"
        }
    }

    var glyph: String {
        switch self {
        case .chats: return "bubble.left.and.bubble.right.fill"
        case .agents: return "person.2.badge.gearshape.fill"
        case .teams: return "square.stack.3d.up.fill"
        case .automations: return "bolt.badge.clock.fill"
        case .discover: return "sparkle.magnifyingglass"
        case .memory: return "brain.head.profile"
        case .artifacts: return "doc.on.doc.fill"
        }
    }
}
