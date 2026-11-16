# Visa Agent · native iOS app (SwiftUI)

A real native iOS app: SwiftUI views, no web view. Light "liquid glass" design, top navigation
bar across every section, visa case agents, offline reply engine, optional live Grok answers.

## What is inside

```
VisaAgent/
  Sources/
    App.swift              app entry, theme wiring
    Theme.swift            colors, glass card, gradient button, backgrounds
    Info.plist
    Models/
      Models.swift         Agent, Chat, Message, Team, Automation, Memory, Artifact, Vault
      Seed.swift           starter visa team, cases and documents
      Store.swift          state, JSON persistence, send + reply engine, Grok call
    Views/
      RootView.swift       top nav bar, section bar, routing
      ChatsView.swift      chat list + chat detail with typing indicator
      AgentsView.swift     specialists + teams
      WorkViews.swift      automations, discover, memory, artifacts
      SettingsView.swift   theme, Grok key, data reset
    Resources/Assets.xcassets   app icon (1024) + accent colour
  project.yml              XcodeGen spec
```

## Build it on a Mac

Requirements: macOS 13+, Xcode 15+, and one of the two routes below.

### Route 1 - XcodeGen (fastest)

```bash
brew install xcodegen
cd ios-nativo/VisaAgent
xcodegen generate
open VisaAgent.xcodeproj
```

Pick an iPhone simulator, press Run. For a device build set your team in
Signing & Capabilities, then Product > Archive > Distribute App.

### Route 2 - no XcodeGen

1. Xcode > File > New > Project > iOS App, name it `VisaAgent`, interface SwiftUI.
2. Delete the generated `ContentView.swift` and app file.
3. Drag the `Sources` folder into the project, tick "Create groups" and add to the app target.
4. Set the Info.plist keys from `Sources/Info.plist`, drop the icon from
   `Sources/Resources/Assets.xcassets` into the target's asset catalog.
5. Run.

### App Store

Bundle id is `com.visamotion.visaagent`. Before submitting you need an Apple Developer
Program membership, an app record in App Store Connect, screenshots and a privacy policy.
The app stores data locally only, so declare "no data collected".

## Live AI

Settings > Live AI brain: paste an xAI key (`xai-...`) and answers come from Grok
(`https://api.x.ai/v1/chat/completions`). Without a key the app answers from a built-in visa
rules engine, so it works offline and in review.

## Honest limit

This source was written here but cannot be compiled in this environment (no macOS, no Xcode).
Expect to fix small warnings on the first build. The web build in the repository root is the
verified, running version of the same design.
