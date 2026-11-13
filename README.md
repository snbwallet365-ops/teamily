# Teamily

An iOS style AI agent team workspace with a liquid glass interface. Single file app, no build step, no server.

Live preview: https://snbwallet365-ops.github.io/teamily/

## What is inside

- **Light glass theme by default** with a full dark glass theme toggle (header button or Settings)
- **Gradient buttons** with an eye catching press glow (`.tapped` animation), soft shadows, spring press scale
- **Chats**: live conversations, typing indicator, timestamps, unread badges, quick reply chips, search, auto saved replies
- **Agents**: create, edit, delete, search, detail sheet with activity stats
- **Agent Teams**: create a team, pick the lead agent, group chat that rotates replies between members
- **Automations**: create, toggle on and off, run now (result is appended to the agent chat), delete
- **Discover**: category filter, add specialists to your agents, try before adding
- **Memory**: add, edit, delete long term facts
- **Artifacts**: save, open, delete outputs; conversations auto save an artifact every few turns
- **Settings**: dark mode, export JSON backup, reset app, iOS Add to Home Screen hint
- **Real time**: BroadcastChannel plus storage events keep every open tab in sync; clock and relative times update live
- State persists in `localStorage` under `teamily.v3`

## Structure

```
index.html    the whole app (HTML, CSS, JS)
README.md
```

## Run locally

Open `index.html` in any modern browser. No install, no dependencies.

## Deploy

GitHub Pages is enabled on this repository. Every push to `main` republishes the live preview.

## Branches

- `main` is the published build
- `feature/*` branches hold work in progress before it reaches the published build

## Keyboard and gesture notes

- `Enter` in the composer sends the message
- Tap the theme button (moon or sun) to switch glass themes
- On iOS Safari use Share then Add to Home Screen for the full screen app view
