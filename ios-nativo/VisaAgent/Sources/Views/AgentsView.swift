import SwiftUI

struct AgentsView: View {
    @EnvironmentObject private var store: Store

    var body: some View {
        VStack(spacing: 12) {
            stats
            ForEach(store.vault.agents) { agent in
                card(agent)
            }
        }
    }

    private var stats: some View {
        HStack(spacing: 10) {
            statTile(value: "\(store.vault.agents.count)", label: "Agents")
            statTile(value: "\(store.vault.teams.count)", label: "Teams")
            statTile(value: "\(store.vault.automations.filter { $0.isOn }.count)", label: "Live jobs")
        }
    }

    private func statTile(value: String, label: String) -> some View {
        VStack(spacing: 2) {
            Text(value)
                .font(.system(size: 20, weight: .bold, design: .rounded))
                .foregroundColor(Theme.ink)
            Text(label)
                .font(.system(size: 11, weight: .medium))
                .foregroundColor(Theme.dim)
        }
        .frame(maxWidth: .infinity)
        .padding(.vertical, 12)
        .glass(radius: 18)
    }

    private func card(_ agent: Agent) -> some View {
        HStack(spacing: 12) {
            ZStack {
                RoundedRectangle(cornerRadius: 16, style: .continuous)
                    .fill(Theme.wash(Theme.tint(agent.tint)))
                Image(systemName: agent.icon).font(.system(size: 22, weight: .semibold)).foregroundColor(Theme.violet)
            }
            .frame(width: 50, height: 50)

            VStack(alignment: .leading, spacing: 4) {
                HStack(spacing: 6) {
                    Text(agent.name)
                        .font(.system(size: 14.5, weight: .semibold))
                        .foregroundColor(Theme.ink)
                        .lineLimit(1)
                    if agent.pinned {
                        Image(systemName: "pin.fill")
                            .font(.system(size: 9))
                            .foregroundColor(Theme.violet)
                    }
                }
                Text(agent.summary)
                    .font(.system(size: 12.4))
                    .foregroundColor(Theme.dim)
                    .lineLimit(2)
                    .fixedSize(horizontal: false, vertical: true)
                HStack(spacing: 6) {
                    ForEach(agent.skills, id: \.self) { skill in
                        Text(skill)
                            .font(.system(size: 10.5, weight: .semibold))
                            .foregroundColor(Theme.violet)
                            .padding(.horizontal, 8)
                            .padding(.vertical, 3)
                            .background(Theme.violet.opacity(0.10), in: Capsule())
                    }
                }
            }
            Spacer(minLength: 0)
        }
        .padding(13)
        .glass(radius: 20)
        .contentShape(Rectangle())
        .onTapGesture { store.openChat(withAgent: agent.id) }
    }
}

struct TeamsView: View {
    @EnvironmentObject private var store: Store

    var body: some View {
        VStack(spacing: 12) {
            ForEach(store.vault.teams) { team in
                VStack(alignment: .leading, spacing: 11) {
                    HStack(spacing: 11) {
                        ZStack {
                            RoundedRectangle(cornerRadius: 15, style: .continuous)
                                .fill(Theme.wash(Theme.violet))
                            Image(systemName: team.icon).font(.system(size: 20, weight: .semibold)).foregroundColor(Theme.violet)
                        }
                        .frame(width: 46, height: 46)
                        VStack(alignment: .leading, spacing: 3) {
                            Text(team.name)
                                .font(.system(size: 14.8, weight: .semibold))
                                .foregroundColor(Theme.ink)
                            Text(team.summary)
                                .font(.system(size: 12.3))
                                .foregroundColor(Theme.dim)
                                .fixedSize(horizontal: false, vertical: true)
                        }
                    }

                    HStack(spacing: -8) {
                        ForEach(team.memberIDs.prefix(5), id: \.self) { memberID in
                            ZStack {
                                Circle().fill(Color.white)
                                Image(systemName: store.agent(memberID)?.icon ?? "person.text.rectangle.fill")
                                    .font(.system(size: 15)).foregroundColor(Theme.violet)
                            }
                            .frame(width: 30, height: 30)
                            .overlay(Circle().stroke(Color.white, lineWidth: 2))
                        }
                        Text("\(team.memberIDs.count) agents")
                            .font(.system(size: 11.5, weight: .medium))
                            .foregroundColor(Theme.dim)
                            .padding(.leading, 16)
                        Spacer()
                    }

                    Button {
                        if let first = team.memberIDs.first {
                            store.openChat(withAgent: first)
                        }
                    } label: {
                        Label("Open team chat", systemImage: "bubble.left.and.bubble.right.fill")
                    }
                    .buttonStyle(GradientButtonStyle(radius: 14))
                }
                .padding(15)
                .glass()
            }
            if store.vault.teams.isEmpty {
                Text("No teams yet.").font(.system(size: 13)).foregroundColor(Theme.faint)
            }
        }
    }
}
