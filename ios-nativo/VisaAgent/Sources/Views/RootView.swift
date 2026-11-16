import SwiftUI

struct ChatTarget: Identifiable {
    let id: String
}

struct RootView: View {
    @EnvironmentObject private var store: Store
    @State private var section: AppSection = .chats
    @State private var showSettings = false

    var body: some View {
        ZStack {
            BackgroundView()
            VStack(spacing: 0) {
                topBar
                sectionBar
                content
            }
            if let message = store.toast {
                VStack {
                    Spacer()
                    Text(message)
                        .font(.system(size: 13, weight: .medium))
                        .foregroundColor(.white)
                        .padding(.horizontal, 16)
                        .padding(.vertical, 10)
                        .background(Theme.ink.opacity(0.9), in: Capsule())
                        .padding(.bottom, 30)
                }
                .transition(.opacity)
            }
        }
        .sheet(isPresented: $showSettings) {
            SettingsView().environmentObject(store)
        }
        .sheet(item: chatTarget) { target in
            ChatDetailView(chatID: target.id).environmentObject(store)
        }
        .animation(.easeInOut(duration: 0.2), value: store.activeChatID)
    }

    private var chatTarget: Binding<ChatTarget?> {
        Binding(
            get: { store.activeChatID.map { ChatTarget(id: $0) } },
            set: { if $0 == nil { store.closeChat() } }
        )
    }

    // MARK: - Top navigation bar

    private var topBar: some View {
        HStack(alignment: .top, spacing: 12) {
            VStack(alignment: .leading, spacing: 3) {
                Text("VISA AGENT")
                    .font(.system(size: 10.5, weight: .bold))
                    .tracking(1.6)
                    .foregroundColor(Theme.violet)
                Text(section.title)
                    .font(.system(size: 27, weight: .bold, design: .rounded))
                    .foregroundColor(Theme.ink)
                Text(subtitle)
                    .font(.system(size: 12.5, weight: .medium))
                    .foregroundColor(Theme.dim)
            }
            Spacer()
            HStack(spacing: 8) {
                iconButton(systemName: store.vault.darkMode ? "sun.max.fill" : "moon.fill") {
                    store.vault.darkMode.toggle()
                    store.persist()
                }
                iconButton(systemName: "gearshape.fill") {
                    showSettings = true
                }
            }
        }
        .padding(.horizontal, 16)
        .padding(.top, 8)
        .padding(.bottom, 10)
    }

    private var subtitle: String {
        if section == .chats {
            return store.unreadTotal > 0 ? "\(store.unreadTotal) unread" : section.subtitle
        }
        return section.subtitle
    }

    private func iconButton(systemName: String, action: @escaping () -> Void) -> some View {
        Button(action: action) {
            Image(systemName: systemName)
                .font(.system(size: 15, weight: .semibold))
                .foregroundColor(Theme.ink)
                .frame(width: 42, height: 42)
                .background(.ultraThinMaterial, in: RoundedRectangle(cornerRadius: 14, style: .continuous))
                .overlay(
                    RoundedRectangle(cornerRadius: 14, style: .continuous)
                        .stroke(Color.white.opacity(0.7), lineWidth: 1)
                )
                .shadow(color: Theme.ink.opacity(0.08), radius: 10, x: 0, y: 6)
        }
        .buttonStyle(PressableStyle())
    }

    // MARK: - Section bar

    private var sectionBar: some View {
        ScrollView(.horizontal, showsIndicators: false) {
            HStack(spacing: 8) {
                ForEach(AppSection.allCases) { item in
                    Button {
                        withAnimation(.spring(response: 0.32, dampingFraction: 0.85)) {
                            section = item
                        }
                    } label: {
                        HStack(spacing: 6) {
                            Image(systemName: item.glyph)
                                .font(.system(size: 12, weight: .semibold))
                            Text(item.rawValue.capitalized)
                                .font(.system(size: 13, weight: .semibold))
                        }
                        .foregroundColor(section == item ? .white : Theme.dim)
                        .padding(.horizontal, 14)
                        .padding(.vertical, 9)
                        .background {
                            if section == item {
                                Capsule().fill(Theme.brand)
                                    .shadow(color: Theme.violet.opacity(0.35), radius: 10, x: 0, y: 6)
                            } else {
                                Capsule().fill(Color.white.opacity(0.65))
                                    .overlay(Capsule().stroke(Color.white.opacity(0.8), lineWidth: 1))
                            }
                        }
                    }
                    .buttonStyle(PressableStyle())
                }
            }
            .padding(.horizontal, 16)
            .padding(.bottom, 10)
        }
    }

    // MARK: - Content

    private var content: some View {
        ScrollView(showsIndicators: false) {
            VStack(spacing: 14) {
                switch section {
                case .chats: ChatsView()
                case .agents: AgentsView()
                case .teams: TeamsView()
                case .automations: AutomationsView()
                case .discover: DiscoverView()
                case .memory: MemoryView()
                case .artifacts: ArtifactsView()
                }
            }
            .padding(.horizontal, 16)
            .padding(.top, 4)
            .padding(.bottom, 40)
        }
    }
}
