# WEB DESIGN SYSTEM — SPORTS COMMUNITY

## 1. PROJECT DIRECTION

Design a modern sports-community website inspired by the energy and social feel of Reclub.vn, but DO NOT copy Reclub's visual identity.

Core feeling:
- Sporty
- Energetic
- Social
- Young
- Premium
- Clean
- Friendly
- Mobile-first

Primary use case:
- Badminton community
- Find badminton courts
- Find/join matches
- Create matches
- Connect with players
- Player profiles
- Community activities

---

## 2. MASTER COLOR PALETTE

### BRAND / PRIMARY

Primary Purple
HEX: #6C4BF4
RGB: 108, 75, 244
Usage:
- Main CTA buttons
- Active navigation
- Links
- Brand/logo elements
- Important interactive elements
- Progress indicators

Primary Dark
HEX: #5135C9
RGB: 81, 53, 201
Usage:
- Button hover
- Active states
- Strong purple backgrounds
- Darker brand accents

Primary Light
HEX: #EEEAFE
RGB: 238, 234, 254
Usage:
- Light purple backgrounds
- Selected cards
- Secondary buttons
- Tags
- Soft highlights

---

## 3. ACCENT COLOR

Electric Lime
HEX: #D9F65A
RGB: 217, 246, 90

Usage:
- LIVE badges
- NEW badges
- Limited slots
- Important statistics
- Small highlights
- Hero emphasis
- Rank/status highlights

IMPORTANT:
Use lime sparingly.
Do NOT use #D9F65A as the main website background.
It should feel like an energetic accent.

Text on lime:
HEX: #17151F

---

## 4. DARK COLORS

Ink
HEX: #17151F
RGB: 23, 21, 31
Usage:
- Main headings
- Primary text
- Dark hero
- Dark navbar
- Dark CTA
- Footer

Charcoal
HEX: #282530
RGB: 40, 37, 48
Usage:
- Secondary dark surfaces
- Dark cards
- Dark sections
- Hover states in dark mode

---

## 5. LIGHT COLORS

Main Background
HEX: #FAFAFC
RGB: 250, 250, 252
Usage:
- Main page background
- Section backgrounds

Pure White
HEX: #FFFFFF
RGB: 255, 255, 255
Usage:
- Cards
- Modals
- Navbar
- Input fields
- Main content surfaces

---

## 6. TEXT COLORS

Primary Text
HEX: #17151F

Secondary Text
HEX: #6F6B78
RGB: 111, 107, 120

Muted Text
HEX: #9A96A3
RGB: 154, 150, 163

Rule:
Use #17151F for important information.
Use #6F6B78 for descriptions.
Use #9A96A3 only for low-priority metadata.

---

## 7. BORDER COLORS

Border
HEX: #E8E6ED
RGB: 232, 230, 237

Use for:
- Card borders
- Input borders
- Dividers
- Tables
- Filters

Avoid heavy black borders.

---

## 8. STATUS COLORS

Success
HEX: #22C55E
Usage:
- Available
- Joined
- Confirmed
- Online
- Successful actions

Danger
HEX: #EF4444
Usage:
- Delete
- Cancel
- Error
- Full / unavailable

Info
HEX: #3B82F6
Usage:
- Information
- System messages
- Informational badges

Warning
HEX: #F59E0B
Usage:
- Warning
- Pending
- Attention

---

## 9. COLOR USAGE RATIO

Recommended visual balance:

60% — #FAFAFC / #FFFFFF
20% — #17151F / #282530
12% — #6C4BF4
5% — #D9F65A
3% — Status/other colors

IMPORTANT:
Do not make the entire website purple.
Purple is the brand/action color, not the universal background.

---

## 10. BUTTON SYSTEM

Primary Button
Background: #6C4BF4
Text: #FFFFFF
Hover: #5135C9

Secondary Button
Background: #EEEAFE
Text: #5135C9
Hover: #DDD6FE

Dark Button
Background: #17151F
Text: #FFFFFF
Hover: #282530

Outline Button
Background: transparent
Border: #E8E6ED
Text: #17151F
Hover background: #FAFAFC

Danger Button
Background: #EF4444
Text: #FFFFFF

---

## 11. BADGE SYSTEM

LIVE
Background: #D9F65A
Text: #17151F

NEW
Background: #6C4BF4
Text: #FFFFFF

AVAILABLE
Background: #DCFCE7
Text: #166534

FULL
Background: #FEE2E2
Text: #991B1B

PENDING
Background: #FEF3C7
Text: #92400E

---

## 12. CARD SYSTEM

Default card:
Background: #FFFFFF
Border: #E8E6ED
Title: #17151F
Description: #6F6B78

Recommended:
- Border radius: 16–24px
- Very subtle shadow
- Avoid excessive shadows
- Use whitespace generously

Match cards should prioritize:
1. Match name
2. Time/date
3. Location
4. Player count
5. Skill level
6. Join button

---

## 13. HERO SECTION

Recommended dark hero:

Background: #17151F
Main heading: #FFFFFF
Secondary text: #B8B4C2
Primary CTA: #6C4BF4
Accent text/highlight: #D9F65A

Example visual hierarchy:

FIND YOUR [WHITE]
GAME. [LIME]

Do not use too many accent colors in the hero.

---

## 14. NAVBAR

Light navbar:
Background: #FFFFFF
Logo: #6C4BF4
Text: #17151F
Secondary text: #6F6B78
Hover: #6C4BF4
CTA: #6C4BF4

Dark navbar:
Background: #17151F
Text: #FFFFFF
Secondary text: #B8B4C2
CTA: #6C4BF4

---

## 15. DARK MODE

Dark Background
#111016

Dark Surface
#1B1921

Dark Surface 2
#24212B

Dark Text
#FFFFFF

Dark Secondary Text
#AAA6B4

Dark Border
#302D38

Dark Primary
#8066FF

Dark Accent
#D9F65A

Dark mode should preserve the same brand identity.

---

## 16. CSS VARIABLES

:root {
  --primary: #6C4BF4;
  --primary-dark: #5135C9;
  --primary-light: #EEEAFE;

  --accent: #D9F65A;

  --ink: #17151F;
  --charcoal: #282530;

  --bg: #FAFAFC;
  --surface: #FFFFFF;

  --text: #17151F;
  --text-secondary: #6F6B78;
  --text-muted: #9A96A3;

  --border: #E8E6ED;

  --success: #22C55E;
  --danger: #EF4444;
  --info: #3B82F6;
  --warning: #F59E0B;
}

---

## 17. DESIGN RULES FOR AI

When generating or modifying the website:

1. Keep the color palette consistent.
2. Do not introduce random colors.
3. Use #6C4BF4 as the main brand/action color.
4. Use #D9F65A only as an accent.
5. Use #17151F for strong typography and dark sections.
6. Use #FAFAFC and #FFFFFF for clean surfaces.
7. Use #6F6B78 for secondary text.
8. Use #E8E6ED for borders.
9. Status colors may be used only for their semantic meaning.
10. Do not use gradients unless they are subtle and remain within the brand palette.
11. Avoid excessive purple backgrounds.
12. Avoid excessive shadows.
13. Maintain strong contrast and accessibility.
14. Keep the visual language sporty, social, modern and premium.
15. The website should feel energetic without becoming visually noisy.
16. Do not copy Reclub's logo, exact layouts, illustrations or proprietary visual assets.
17. Prioritize responsive design for desktop, tablet and mobile.
18. Keep buttons, cards, badges, forms and navigation visually consistent.

---

## 18. CORE BRAND FORMULA

PRIMARY:
#6C4BF4

ACCENT:
#D9F65A

DARK:
#17151F

BACKGROUND:
#FAFAFC

SURFACE:
#FFFFFF

SECONDARY TEXT:
#6F6B78

BORDER:
#E8E6ED

The overall visual identity should communicate:

SPORT + COMMUNITY + ENERGY + PREMIUM + SIMPLICITY
