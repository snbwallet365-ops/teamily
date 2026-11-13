# Teamily iOS build

The app is wrapped with Capacitor. One codebase, real native iOS app.

## Requirements

- macOS with Xcode 15 or newer
- Node 18+
- CocoaPods (`sudo gem install cocoapods`)
- A paid Apple Developer Program membership for App Store distribution (99 USD/year)

## Build

```bash
cd ..
npm install
npm run ios:add      # first time only: generates ios/App/App.xcworkspace
npm run ios:assets   # AppIcon + splash from assets/icon.png and assets/splash.png
npm run ios:open     # opens the workspace in Xcode
```

Re-run `npm run ios:sync` after any change to `index.html`.

## In Xcode

1. Select the `App` target, Signing & Capabilities, choose your team. Bundle id defaults to
   `com.visamotion.teamily`; change it to one you own.
2. Set the deployment target to iOS 15 or newer.
3. Run on a connected iPhone (or Simulator) to verify.
4. Product > Archive, then Distribute App > App Store Connect > Upload.

## App Store checklist

- App icon 1024x1024 without transparency (comes from `assets/icon.png`)
- Screenshots for 6.7" and 6.1" iPhones, plus 12.9" iPad if you support iPad
- Privacy policy URL. The app stores chat data only on the device and sends text to the AI
  provider you configure, so declare that honestly in App Privacy
- Age rating questionnaire
- A demo account or a note that no login is needed
- If you ship the bring-your-own-key AI, say so in the description: users connect their own
  provider key

Apple reviews the binary, not this repo. Nothing here can upload a build for you: the archive
step requires Xcode and your developer account.
