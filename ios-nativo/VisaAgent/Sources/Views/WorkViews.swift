import SwiftUI

struct AutomationsView: View {
    @EnvironmentObject private var store: Store

    var body: some View {
        VStack(spacing: 12) {
            ForEach(store.vault.automations) { item in
                HStack(spacing: 12) {
                    ZStack {
                        RoundedRectangle(cornerRadius: 14, style: .continuous)
                            .fill(Theme.wash(item.isOn ? Theme.mint : Theme.faint))
                        Image(systemName: "bolt.fill")
                            .font(.system(size: 16, weight: .semibold))
                            .foregroundColor(item.isOn ? Theme.mint : Theme.faint)
                    }
                    .frame(width: 44, height: 44)

                    VStack(alignment: .leading, spacing: 3) {
                        Text(item.name)
                            .font(.system(size: 14.3, weight: .semibold))
                            .foregroundColor(Theme.ink)
                        Text(item.schedule)
                            .font(.system(size: 12.2))
                            .foregroundColor(Theme.dim)
                    }
                    Spacer()
                    Toggle("", isOn: binding(for: item.id))
                        .labelsHidden()
                        .tint(Theme.violet)
                }
                .padding(13)
                .glass(radius: 20)
            }
        }
    }

    private func binding(for id: String) -> Binding<Bool> {
        Binding(
            get: { store.vault.automations.first { $0.id == id }?.isOn ?? false },
            set: { newValue in
                if let index = store.vault.automations.firstIndex(where: { $0.id == id }) {
                    store.vault.automations[index].isOn = newValue
                    store.vault.automations[index].lastRun = newValue ? Date() : nil
                    store.persist()
                }
            }
        )
    }
}

struct DiscoverPick: Identifiable {
    let id: String
    let icon: String
    let blurb: String
    let skills: [String]
}

struct DiscoverView: View {
    @EnvironmentObject private var store: Store

    private let catalog: [DiscoverPick] = [
        DiscoverPick(id: "tr", icon: "globe.asia.australia.fill", blurb: "Tourist and business files for Türkiye.", skills: ["Tourist", "e-Visa"]),
        DiscoverPick(id: "my", icon: "globe.asia.australia.fill", blurb: "Short visit and work pass routes.", skills: ["Visit", "Work pass"]),
        DiscoverPick(id: "jp", icon: "globe.asia.australia.fill", blurb: "Itinerary heavy files with guarantee letters.", skills: ["Itinerary", "Guarantee"]),
        DiscoverPick(id: "tr2", icon: "doc.on.doc.fill", blurb: "Certified translation and attestation guidance.", skills: ["Translation", "Attestation"])
    ]

    private var names: [String: String] {
        ["tr": "Türkiye Visa Advisor",
         "my": "Malaysia & Singapore Advisor",
         "jp": "Japan & Korea Advisor",
         "tr2": "Document Translator"]
    }

    var body: some View {
        VStack(spacing: 12) {
            ForEach(catalog) { item in
                HStack(spacing: 12) {
                    ZStack {
                        RoundedRectangle(cornerRadius: 15, style: .continuous)
                            .fill(Theme.wash(Theme.cyan))
                        Image(systemName: item.icon).font(.system(size: 20, weight: .semibold)).foregroundColor(Theme.violet)
                    }
                    .frame(width: 46, height: 46)

                    VStack(alignment: .leading, spacing: 3) {
                        Text(names[item.id] ?? "Specialist")
                            .font(.system(size: 14.2, weight: .semibold))
                            .foregroundColor(Theme.ink)
                        Text(item.blurb)
                            .font(.system(size: 12.2))
                            .foregroundColor(Theme.dim)
                            .fixedSize(horizontal: false, vertical: true)
                    }
                    Spacer(minLength: 8)

                    Button {
                        add(item)
                    } label: {
                        Text(has(item) ? "Added" : "Add")
                            .font(.system(size: 12.5, weight: .semibold))
                            .foregroundColor(has(item) ? Theme.dim : .white)
                            .padding(.horizontal, 14)
                            .padding(.vertical, 8)
                            .background {
                                if has(item) {
                                    Capsule().fill(Color.white.opacity(0.7))
                                } else {
                                    Capsule().fill(Theme.brand)
                                }
                            }
                    }
                    .buttonStyle(PressableStyle())
                    .disabled(has(item))
                }
                .padding(13)
                .glass(radius: 20)
            }
        }
    }

    private func has(_ pick: DiscoverPick) -> Bool {
        let name = names[pick.id] ?? ""
        return store.vault.agents.contains { $0.name == name }
    }

    private func add(_ pick: DiscoverPick) {
        guard !has(pick) else { return }
        let agent = Agent(id: UUID().uuidString,
                          name: names[pick.id] ?? "Specialist",
                          icon: pick.icon,
                          role: "Visa specialist",
                          summary: pick.blurb,
                          skills: pick.skills,
                          tint: store.vault.agents.count,
                          pinned: false)
        store.vault.agents.append(agent)
        store.persist()
        store.flash("Added \(agent.name)")
    }
}

struct MemoryView: View {
    @EnvironmentObject private var store: Store
    @State private var showEditor = false
    @State private var draftKey = ""
    @State private var draftValue = ""

    var body: some View {
        VStack(spacing: 12) {
            ForEach(store.vault.memories) { item in
                VStack(alignment: .leading, spacing: 5) {
                    Text(item.key.uppercased())
                        .font(.system(size: 10.2, weight: .bold))
                        .tracking(1.2)
                        .foregroundColor(Theme.violet)
                    Text(item.value)
                        .font(.system(size: 13.6))
                        .foregroundColor(Theme.ink)
                        .fixedSize(horizontal: false, vertical: true)
                }
                .frame(maxWidth: .infinity, alignment: .leading)
                .padding(14)
                .glass(radius: 18)
                .contextMenu {
                    Button(role: .destructive) {
                        store.vault.memories.removeAll { $0.id == item.id }
                        store.persist()
                    } label: {
                        Label("Delete", systemImage: "trash")
                    }
                }
            }

            Button {
                draftKey = ""
                draftValue = ""
                showEditor = true
            } label: {
                Label("Add memory", systemImage: "plus")
            }
            .buttonStyle(GradientButtonStyle())
        }
        .sheet(isPresented: $showEditor) {
            NavigationStack {
                VStack(spacing: 12) {
                    TextField("Key, for example Passport", text: $draftKey)
                        .textFieldStyle(.roundedBorder)
                    TextField("Value", text: $draftValue, axis: .vertical)
                        .lineLimit(3...6)
                        .textFieldStyle(.roundedBorder)
                    Spacer()
                }
                .padding(18)
                .navigationTitle("New memory")
                .toolbar {
                    ToolbarItem(placement: .cancellationAction) {
                        Button("Cancel") { showEditor = false }
                    }
                    ToolbarItem(placement: .confirmationAction) {
                        Button("Save") {
                            let key = draftKey.trimmingCharacters(in: .whitespaces)
                            let value = draftValue.trimmingCharacters(in: .whitespaces)
                            if !key.isEmpty && !value.isEmpty {
                                store.vault.memories.append(MemoryItem(id: UUID().uuidString, key: key, value: value))
                                store.persist()
                            }
                            showEditor = false
                        }
                    }
                }
            }
        }
    }
}

struct ArtifactsView: View {
    @EnvironmentObject private var store: Store
    @State private var selected: ArtifactItem?

    var body: some View {
        VStack(spacing: 12) {
            ForEach(store.vault.artifacts) { item in
                Button {
                    selected = item
                } label: {
                    HStack(spacing: 12) {
                        ZStack {
                            RoundedRectangle(cornerRadius: 14, style: .continuous)
                                .fill(Theme.wash(Theme.pink))
                            Image(systemName: item.icon).font(.system(size: 19, weight: .semibold)).foregroundColor(Theme.violet)
                        }
                        .frame(width: 44, height: 44)

                        VStack(alignment: .leading, spacing: 3) {
                            Text(item.title)
                                .font(.system(size: 14.2, weight: .semibold))
                                .foregroundColor(Theme.ink)
                            Text(ago(item.at) + " ago")
                                .font(.system(size: 11.8))
                                .foregroundColor(Theme.dim)
                        }
                        Spacer()
                        Image(systemName: "chevron.right")
                            .font(.system(size: 12, weight: .bold))
                            .foregroundColor(Theme.faint)
                    }
                    .padding(13)
                    .glass(radius: 20)
                }
                .buttonStyle(PressableStyle())
            }
        }
        .sheet(item: $selected) { item in
            NavigationStack {
                ScrollView {
                    Text(item.body)
                        .font(.system(size: 14.5))
                        .foregroundColor(Theme.ink)
                        .frame(maxWidth: .infinity, alignment: .leading)
                        .padding(20)
                }
                .background(Theme.canvas)
                .navigationTitle(item.title)
                .navigationBarTitleDisplayMode(.inline)
            }
        }
    }
}
