import SwiftUI

@main
struct VisaAgentApp: App {
    @StateObject private var store = Store()

    var body: some Scene {
        WindowGroup {
            RootView()
                .environmentObject(store)
                .preferredColorScheme(store.vault.darkMode ? .dark : .light)
        }
    }
}
