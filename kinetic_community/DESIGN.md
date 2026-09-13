---
name: Kinetic Community
colors:
  surface: '#fff8f0'
  surface-dim: '#e2d9c8'
  surface-bright: '#fff8f0'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#fcf3e1'
  surface-container: '#f6eddb'
  surface-container-high: '#f0e7d6'
  surface-container-highest: '#ebe2d0'
  on-surface: '#1f1b11'
  on-surface-variant: '#4d4632'
  inverse-surface: '#353024'
  inverse-on-surface: '#f9f0de'
  outline: '#7f7660'
  outline-variant: '#d1c6ab'
  surface-tint: '#735c00'
  primary: '#735c00'
  on-primary: '#ffffff'
  primary-container: '#facc15'
  on-primary-container: '#6c5700'
  inverse-primary: '#eec200'
  secondary: '#3d5aad'
  on-secondary: '#ffffff'
  secondary-container: '#89a5fe'
  on-secondary-container: '#14378a'
  tertiary: '#006876'
  on-tertiary: '#ffffff'
  tertiary-container: '#33e4ff'
  on-tertiary-container: '#006270'
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
  on-secondary-fixed: '#00174c'
  on-secondary-fixed-variant: '#214194'
  tertiary-fixed: '#a0efff'
  tertiary-fixed-dim: '#15daf4'
  on-tertiary-fixed: '#001f25'
  on-tertiary-fixed-variant: '#004e59'
  background: '#fff8f0'
  on-background: '#1f1b11'
  surface-variant: '#ebe2d0'
  action-blue: '#1c3d90'
  surface-cream: '#fdeabc'
  ink-slate: '#0f172a'
  team-red: '#ef4444'
typography:
  display-xl:
    fontFamily: Anybody
    fontSize: 64px
    fontWeight: '800'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  display-xl-mobile:
    fontFamily: Anybody
    fontSize: 40px
    fontWeight: '800'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Anybody
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Anybody
    fontSize: 24px
    fontWeight: '700'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  label-bold:
    fontFamily: Anybody
    fontSize: 14px
    fontWeight: '700'
    lineHeight: '1.0'
  caption:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1.4'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  baseline: 4px
  gutter: 16px
  margin-mobile: 16px
  margin-desktop: 64px
  stack-sm: 8px
  stack-md: 24px
  stack-lg: 48px
---

## Brand & Style

This design system is built for a high-energy sports community, emphasizing movement, connection, and the "love of the game." The brand personality is competitive yet inclusive, professional in its utility but raw and community-driven in its presentation. 

The aesthetic follows a **High-Contrast / Bold** movement with subtle **Modern / Corporate** structural foundations. It utilizes aggressive typography and a vibrant palette to create a sense of urgency and excitement, mirroring the atmosphere of a live sporting event. Visuals should lean heavily on authentic, candid photography of athletes and enthusiasts to maintain a "real-world" grit that balances the polished UI elements.

## Colors

The palette is anchored by a vibrant, high-energy yellow that serves as the primary brand catalyst. This is balanced by a deep, authoritative secondary blue for structural elements and navigation. 

- **Primary (Yellow):** Used for primary calls to action, hero highlights, and interactive focal points.
- **Secondary (Blue):** Used for branding, headers, and secondary actions to provide professional grounding.
- **Neutral (Slate/White):** High-contrast dark slate is used for maximum legibility in typography, while white and cream provide clean surfaces for data-heavy views.
- **Semantic Accents:** A bold red is reserved for competitive team identification and status alerts.

## Typography

The typography system relies on the tension between the expressive, variable nature of **Anybody** and the systematic clarity of **Inter**.

- **Anybody** is used for all display, headlines, and labels. Its bold, slightly condensed nature evokes sports journalism and scoreboard aesthetics. It should be used in heavy weights (700-800) for maximum impact.
- **Inter** handles all body copy and technical data. Its neutral, utilitarian personality ensures that high-density community information (like player stats or match details) remains highly legible.
- **Case Treatment:** Use Uppercase for labels and "Display" hooks to enhance the aggressive, high-energy tone.

## Layout & Spacing

This design system uses a **Fluid Grid** approach with a modular 8px rhythm. 

- **Desktop:** 12-column grid with 24px gutters. Content is often grouped in cards or containers that span 3, 4, or 6 columns.
- **Mobile:** 4-column grid with 16px gutters and margins. 
- **Density:** Spacing should feel "athletic"—tight enough to feel fast and efficient, but with large vertical gaps (stack-lg) between major sections to allow the bold typography breathing room.
- **Alignment:** Use rigid edge-to-edge alignments for containers to maintain a structured, professional feel.

## Elevation & Depth

Depth is achieved through **Tonal Layers** and **Low-contrast outlines** rather than heavy shadows. This maintains a clean, modern aesthetic that feels like a digital tool.

- **Stacking:** Use surface tiers (White -> Light Grey -> Primary Color) to indicate hierarchy.
- **Outlines:** Containers use thin, 1px borders in low-opacity slate or blue to define boundaries without adding visual weight.
- **Interactive State:** Elements may lift slightly using a very soft, high-diffusion ambient shadow (10% opacity) only on hover to provide tactile feedback for the community-driven interactive elements.

## Shapes

The shape language is defined by **ROUND_EIGHT** (0.5rem) as the base unit. This creates a friendly, "squishy" feel that offsets the aggressive typography and bold colors.

- **Base Radius:** 0.5rem (8px) for standard buttons, inputs, and small cards.
- **Large Radius:** 1rem (16px) for main feature sections and prominent community content cards.
- **Avatar/Icons:** Circular shapes are used for user profiles to contrast against the geometric grid.

## Components

- **Buttons:** Primary buttons use the brand yellow with black text. They are bold and high-contrast. Secondary buttons use the brand blue with white text. All buttons use the base 8px roundedness.
- **Cards:** Cards should have a subtle 1px border. Use high-quality sports photography as the background for hero-style cards, with a dark gradient overlay to ensure text legibility.
- **Input Fields:** Clean, white backgrounds with a slate border. On focus, the border shifts to the primary yellow.
- **Chips/Badges:** Used for sport categories (e.g., "Volleyball", "Soccer"). These use a semi-transparent version of the primary yellow or secondary blue to remain distinct without overpowering the UI.
- **Lists:** Community lists (participants/teams) should use circular avatars and bold Anybody labels for names, ensuring a "team roster" feel.