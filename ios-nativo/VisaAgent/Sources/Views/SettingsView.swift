import SwiftUI

struct SettingsView: View {
    @EnvironmentObject private var store: Store
    @Environment(\.dismiss) private var dismiss
    @State private var keyDraft = ""
    @State private var modelDraft = ""
    @State private var savedFlash = false

    var body: some View {
        NavigationStack {
            Form {
                Section("Appearance") {
                    Toggle("Dark glass mode", isOn: Binding(
                        get: { store.vault.darkMode },
                        set: { store.vault.darkMode = $0; store.persist() }
                    ))
                }

                Section {
                    SecureField("xai-...", text: $keyDraft)
                        .textInputAutocapitalization(.never)
                        .autocorrectionDisabled()
                    TextField("grok-4", text: $modelDraft)
                        .textInputAutocapitalization(.never)
                        .autocorrectionDisabled()
                } header: {
                    Text("Live AI brain")
                } footer: {
                    Text("Add your xAI Grok key to get real model answers. The key is stored on this device only. Leave it empty and the app answers offline.")
                }

                Section {
                    Button(savedFlash ? "Saved" : "Save AI settings") {
                        store.vault.apiKey = keyDraft.trimmingCharacters(in: .whitespaces)
                        store.vault.model = modelDraft.trimmingCharacters(in: .whitespaces)
                        store.persist()
                        savedFlash = true
                        Task {
                            try? await Task.sleep(nanoseconds: 1_500_000_000)
                            savedFlash = false
                        }
                    }
                    Link("Get a key at console.x.ai", destination: URL(string: "https://console.x.ai")!)
                }

                Section("Data") {
                    LabeledContent("Agents", value: "\(store.vault.agents.count)")
                    LabeledContent("Chats", value: "\(store.vault.chats.count)")
                    LabeledContent("Artifacts", value: "\(store.vault.artifacts.count)")
                    Button(role: .destructive) {
                        store.vault = Store.seed()
                        store.persist()
                        keyDraft = ""
                        modelDraft = store.vault.model
                    } label: {
                        Text("Reset to sample data")
                    }
                }

                Section("About") {
                    LabeledContent("App", value: "Visa Agent")
                    LabeledContent("Version", value: "1.0 (1)")
                    LabeledContent("Bundle", value: "com.visamotion.visaagent")
                }
            }
            .navigationTitle("Settings")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .confirmationAction) {
                    Button("Done") { dismiss() }
                }
            }
            .onAppear {
                keyDraft = store.vault.apiKey
                modelDraft = store.vault.model
            }
        }
    }
}
