import SwiftUI

enum Theme {
    static let ink = Color(red: 0.06, green: 0.10, blue: 0.20)
    static let dim = Color(red: 0.36, green: 0.41, blue: 0.50)
    static let faint = Color(red: 0.55, green: 0.60, blue: 0.68)
    static let canvas = Color(red: 0.95, green: 0.96, blue: 0.995)
    static let card = Color.white

    static let violet = Color(red: 0.486, green: 0.361, blue: 1.00)
    static let blue = Color(red: 0.33, green: 0.55, blue: 1.00)
    static let cyan = Color(red: 0.13, green: 0.83, blue: 0.93)
    static let pink = Color(red: 1.00, green: 0.48, blue: 0.72)
    static let mint = Color(red: 0.20, green: 0.83, blue: 0.60)
    static let amber = Color(red: 1.00, green: 0.69, blue: 0.13)

    static let palette: [Color] = [violet, cyan, pink, mint, amber, blue]

    static func tint(_ index: Int) -> Color {
        palette[abs(index) % palette.count]
    }

    static var brand: LinearGradient {
        LinearGradient(colors: [violet, blue, cyan], startPoint: .topLeading, endPoint: .bottomTrailing)
    }

    static func wash(_ color: Color) -> LinearGradient {
        LinearGradient(colors: [color.opacity(0.22), color.opacity(0.06)], startPoint: .topLeading, endPoint: .bottomTrailing)
    }

    static var canvasGradient: LinearGradient {
        LinearGradient(colors: [Color.white, canvas, Color(red: 0.93, green: 0.95, blue: 1.0)],
                       startPoint: .top, endPoint: .bottom)
    }
}

struct GlassCard: ViewModifier {
    var radius: CGFloat = 22
    func body(content: Content) -> some View {
        content
            .background(.ultraThinMaterial, in: RoundedRectangle(cornerRadius: radius, style: .continuous))
            .overlay(
                RoundedRectangle(cornerRadius: radius, style: .continuous)
                    .stroke(Color.white.opacity(0.65), lineWidth: 1)
            )
            .shadow(color: Color(red: 0.10, green: 0.15, blue: 0.34).opacity(0.10), radius: 18, x: 0, y: 10)
    }
}

extension View {
    func glass(radius: CGFloat = 22) -> some View { modifier(GlassCard(radius: radius)) }
    func screenPadding() -> some View { padding(.horizontal, 16) }
}

struct PressableStyle: ButtonStyle {
    func makeBody(configuration: Configuration) -> some View {
        configuration.label
            .scaleEffect(configuration.isPressed ? 0.96 : 1)
            .animation(.spring(response: 0.26, dampingFraction: 0.7), value: configuration.isPressed)
    }
}

struct GradientButtonStyle: ButtonStyle {
    var radius: CGFloat = 16
    func makeBody(configuration: Configuration) -> some View {
        configuration.label
            .font(.system(size: 15, weight: .semibold))
            .foregroundColor(.white)
            .padding(.vertical, 13)
            .frame(maxWidth: .infinity)
            .background(Theme.brand, in: RoundedRectangle(cornerRadius: radius, style: .continuous))
            .overlay(
                RoundedRectangle(cornerRadius: radius, style: .continuous)
                    .stroke(Color.white.opacity(0.35), lineWidth: 1)
            )
            .shadow(color: Theme.violet.opacity(configuration.isPressed ? 0.55 : 0.30),
                    radius: configuration.isPressed ? 22 : 12, x: 0, y: 8)
            .scaleEffect(configuration.isPressed ? 0.97 : 1)
            .animation(.easeOut(duration: 0.16), value: configuration.isPressed)
    }
}

struct BackgroundView: View {
    var body: some View {
        ZStack {
            Theme.canvasGradient
            Circle()
                .fill(Theme.violet.opacity(0.20))
                .frame(width: 320, height: 320)
                .blur(radius: 90)
                .offset(x: -120, y: -260)
            Circle()
                .fill(Theme.cyan.opacity(0.18))
                .frame(width: 300, height: 300)
                .blur(radius: 90)
                .offset(x: 140, y: -180)
            Circle()
                .fill(Theme.pink.opacity(0.12))
                .frame(width: 320, height: 320)
                .blur(radius: 100)
                .offset(x: 120, y: 340)
        }
        .ignoresSafeArea()
    }
}
