# Teamily · AI agent team

A working AI-agent team app: chats, agents, teams, automations, discover, memory and artifacts.
Light "liquid glass" design first, dark mode one tap away, iOS-style top navigation bar across
every section.

**Live (web / PWA):** https://snbwallet365-ops.github.io/teamily/

## What works

| Area | Behaviour |
| --- | --- |
| Top nav bar | Collapsing iOS header + scrollable section bar with all 7 sections |
| Chats | Real conversation threads, typing state, unread badges, search, quick replies |
| Agents | Create, edit, delete, chat with any agent |
| Teams | Group agents, team chat rotates members, results saved as artifacts |
| Automations | Create, schedule text, toggle on/off, Run now |
| Discover | Specialist catalogue, add to your agents, try chat |
| Memory | Long-term facts your team keeps |
| Artifacts | Saved outputs from agents, open and delete |
| Live AI brain | Optional: add your own OpenAI / Anthropic / OpenRouter / Groq key in Settings and replies become real model output |
| Storage | localStorage, survives reload; BroadcastChannel keeps open tabs in sync; JSON export/import |
| Offline | Service worker caches the app shell, installable to the home screen |

The API key never leaves the device: it is stored in localStorage and sent only to the provider
you pick. With no key the app runs on its built-in offline reply engine.

## Run locally

```bash
npm run serve          # copies the app into www/ and serves it on :4173
```

## Native iOS app (App Store path)

The web app ships with a Capacitor native shell, so the same code runs as a real iOS app.

```bash
npm install
npm run ios:add        # creates the Xcode project in ios/
npm run ios:assets     # writes AppIcon + launch screen from assets/
npm run ios:open       # opens ios/App/App.xcworkspace in Xcode
```

Then in Xcode: pick a signing team, plug in an iPhone, press Run. To publish, Product > Archive
> Distribute App > App Store Connect. That step needs macOS with Xcode and a paid Apple Developer
account, which cannot be done from a browser or a Linux server.

Details and the review checklist: [ios/README.md](ios/README.md)

## Files

- `index.html` - the whole app (single file, no build step)
- `manifest.webmanifest`, `sw.js`, `icons/` - PWA install + offline shell
- `capacitor.config.json`, `package.json` - native iOS wrapper
- `assets/` - 1024 icon and launch image for the iOS asset generator
