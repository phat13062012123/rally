---
name: Kinetic Unity
colors:
  surface: '#f7f9fb'
  surface-dim: '#d8dadc'
  surface-bright: '#f7f9fb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f4f6'
  surface-container: '#eceef0'
  surface-container-high: '#e6e8ea'
  surface-container-highest: '#e0e3e5'
  on-surface: '#191c1e'
  on-surface-variant: '#4d4632'
  inverse-surface: '#2d3133'
  inverse-on-surface: '#eff1f3'
  outline: '#7f7660'
  outline-variant: '#d1c6ab'
  surface-tint: '#735c00'
  primary: '#735c00'
  on-primary: '#ffffff'
  primary-container: '#facc15'
  on-primary-container: '#6c5700'
  inverse-primary: '#eec200'
  secondary: '#0051d5'
  on-secondary: '#ffffff'
  secondary-container: '#316bf3'
  on-secondary-container: '#fefcff'
  tertiary: '#565e74'
  on-tertiary: '#ffffff'
  tertiary-container: '#c9d0ea'
  on-tertiary-container: '#51596f'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffe083'
  primary-fixed-dim: '#eec200'
  on-primary-fixed: '#231b00'
  on-primary-fixed-variant: '#574500'
  secondary-fixed: '#dbe1ff'
  secondary-fixed-dim: '#b4c5ff'
  on-secondary-fixed: '#00174b'
  on-secondary-fixed-variant: '#003ea8'
  tertiary-fixed: '#dae2fd'
  tertiary-fixed-dim: '#bec6e0'
  on-tertiary-fixed: '#131b2e'
  on-tertiary-fixed-variant: '#3f465c'
  background: '#f7f9fb'
  on-background: '#191c1e'
  surface-variant: '#e0e3e5'
typography:
  display-xl:
    fontFamily: Anybody
    fontSize: 64px
    fontWeight: '800'
    lineHeight: 72px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Anybody
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Anybody
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 38px
  headline-md:
    fontFamily: Anybody
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Hanken Grotesk
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Hanken Grotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-caps:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '700'
    lineHeight: 16px
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  container-max: 1280px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 48px
  stack-sm: 12px
  stack-md: 24px
  stack-lg: 48px
---

## Brand & Style

The design system is built for a high-energy, community-centric sports platform. It captures the raw momentum of athletic movement while maintaining the structured reliability of a professional coordination tool. The personality is **vibrant, inclusive, and athletic**, moving away from amateur aesthetics toward a "Pro-Am" digital experience.

The visual style is a blend of **Modern / Corporate** reliability with **High-Contrast** energy. We utilize generous whitespace to allow action-oriented photography to breathe, paired with tight, technical typography that suggests precision. The aesthetic goal is to feel like a premium sports equipment brand—utilitarian but emotionally charged.

Key visual principles:
- **Momentum:** Use of slight italics in display type and directional cues.
- **Clarity:** Heavy use of neutral backgrounds to make primary brand colors pop.
- **Inclusivity:** Softening industrial edges with rounded corners to remain approachable for casual hobbyists.

## Colors

The palette is derived from the core heritage colors but refined for modern accessibility and professional digital standards.

- **Primary (Electric Yellow):** A high-visibility, saturated yellow used for critical actions and brand highlights. It represents the "energy" of the game.
- **Secondary (Action Blue):** A punchy, reliable blue used for links, interactive states, and secondary buttons. It provides a professional counterpoint to the yellow.
- **Tertiary (Deep Navy):** The foundational anchor. Used for high-contrast text and deep-background sections. It replaces pure black to add depth and a premium feel.
- **Neutral (Slate White):** A cool-toned off-white that prevents screen glare and provides a clean canvas for content-heavy pages.

**Contrast Strategy:** Yellow should primarily be used against the Deep Navy for maximum impact and readability. Avoid placing white text directly on Yellow; use Deep Navy text instead.

## Typography

The typography strategy focuses on the "Strength vs. Precision" dichotomy.

- **Headlines:** Use **Anybody**. Its variable-width influence and bold weights convey a sense of modern athleticism and urgency. For hero sections, use the extra-bold weights with tight letter spacing.
- **Body Text:** Use **Hanken Grotesk**. This font provides exceptional legibility for long-form community posts, game rules, and event details. Its contemporary grotesque style feels "tech-forward" yet neutral.
- **Data & Labels:** Use **JetBrains Mono**. For technical details like scores, times, and player counts, a monospaced font adds a layer of "sports-data" professionality, making the platform feel like a high-performance dashboard.

All headlines should be set in Deep Navy. Body text should remain high-contrast (Slate 800-900) to ensure readability during outdoor use (on the field).

## Layout & Spacing

This design system employs a **Fluid Grid** model based on an 8px rhythm to ensure perfect alignment across mobile and desktop.

- **Desktop:** A 12-column grid with a max-width of 1280px. Gutters are fixed at 24px to ensure distinct separation of "Game Cards."
- **Mobile:** A 4-column fluid grid. Side margins are reduced to 16px to maximize content space.
- **Vertical Rhythm:** We use "Stack" spacing. Components within a card use `stack-sm`. Cards within a feed use `stack-md`. Major sections of the page use `stack-lg` to create a clear visual break and emphasize "The Breathe" (whitespace).

Layouts should favor vertical stacking on mobile for easy one-handed thumb navigation, essential for athletes on the move.

## Elevation & Depth

Visual hierarchy is managed through **Tonal Layers** and **Ambient Shadows**.

1.  **Floor (Level 0):** The primary background (Neutral/Slate White).
2.  **Surface (Level 1):** White cards or containers. These use a very subtle, diffused shadow: `0 4px 20px rgba(15, 23, 42, 0.05)`. This lifts the content just enough to distinguish it from the background without feeling "heavy."
3.  **Active (Level 2):** Hover states or active modals. Shadows become more pronounced and slightly more opaque: `0 12px 32px rgba(15, 23, 42, 0.12)`.
4.  **Action Pins:** Buttons and floating action buttons (FABs) utilize high-contrast colors (Primary Yellow) to sit "above" all other content purely through color-theory-based elevation.

Avoid using borders for separation; use color blocking and soft shadows to maintain the "Modern & Clean" look.

## Shapes

The shape language is **Rounded**, signaling a friendly and inclusive community.

- **Standard Components:** Buttons, input fields, and small chips use a 0.5rem (8px) radius. This provides a soft, modern touch that contrasts against the sharp, bold typography.
- **Large Components:** Cards and main containers use a 1rem (16px) radius to emphasize the "contained" nature of community groups.
- **Iconography:** Use thick-stroke (2pt) icons with rounded caps to match the UI's geometry. Avoid thin, sharp lines which can feel too fragile for a sports-centric brand.

## Components

- **Buttons:** 
    - *Primary:* Electric Yellow background with Deep Navy text. Bold weight. High-energy.
    - *Secondary:* Clear Action Blue text with a subtle Slate 100 background.
- **Game Cards:** The core unit. High-contrast headlines, JetBrains Mono for "Time/Location" metadata, and a clear "Join" button in the bottom right. Use 16px padding and 16px rounded corners.
- **Status Chips:** Small, pill-shaped labels for "Live," "Open," or "Full." Use low-saturation background tints (e.g., light green tint for "Open") with high-saturation text.
- **Input Fields:** Minimalist design with a 1px Slate 200 border that transforms to a 2px Action Blue border on focus. No shadows on resting state.
- **Navigation:** A clean top-bar on desktop, and a persistent bottom-bar on mobile. Use icons for mobile navigation to ensure a "native app" feel within the web experience.
- **Avatars:** Always circular to represent individuals. Use a 2px White border when stacked to show the "Team" or "Community" effect.