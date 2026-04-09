# Design Brief: KeyRakshak

**Purpose**: Lost key recovery via QR codes. Owners register keys, finders scan QR to contact anonymously. Security + urgency + trust.

## Aesthetic
Minimalist productivity (Linear, Notion energy). Mobile-first, high information density. Secure not sterile. Modern sans-serif, emerald teal + warm orange.

## Color Palette (OKLCH)

| Role | L | C | H | Usage |
|------|---|---|---|-------|
| Primary (Trust) | 0.52 | 0.16 | 175 | Headers, key cards, primary buttons |
| Accent (Urgency) | 0.65 | 0.19 | 55 | Lost Mode, reward badge, alerts |
| Success (Found) | 0.68 | 0.12 | 135 | Recovery states, positive feedback |
| Warning (Offer) | 0.70 | 0.15 | 80 | Reward amount, incentive display |
| Destructive | 0.55 | 0.22 | 25 | Delete, cancel, danger states |
| Neutral (Light BG) | 0.98 | 0 | 0 | Page background, content surface |
| Neutral (Muted) | 0.94 | 0.01 | 0 | Card separators, subtle sections |
| Neutral (Border) | 0.88 | 0.01 | 0 | Lines, dividers, input borders |

## Typography

| Role | Font | Weight | Size | Usage |
|------|------|--------|------|-------|
| Display | General Sans | 700 | 28–36px | Headings, key names |
| Body | DM Sans | 400 | 14–16px | Text, descriptions |
| Mono | Geist Mono | 600 | 12–14px | QR IDs (KR1001), codes |

## Structural Zones

| Zone | Background | Border | Elevation | Usage |
|------|-----------|--------|-----------|-------|
| Header | Primary (teal) | Border-b subtle | md shadow | Top nav, branding, user menu |
| Content | Neutral light | None | Flat | Main scrollable area |
| Card Sections | Card (white/light) | Border subtle | md shadow | Key cards, action cards |
| Muted Sections | Muted bg | None | Flat | Alternating sections for rhythm |
| Footer | Muted bg | Border-t subtle | Flat | Footer links, copyright |
| QR Frame | White, border-4 primary | Circular | Centered focus | Finder page QR display |

## Component Patterns
- Buttons: Primary emerald + orange accent, rounded 8px, hover opacity-90
- Cards: Rounded 8px, subtle shadow, hover shadow-lg, border-border
- Badges: Accent orange bg/10 with orange text for "Reward Offered"
- Inputs: Muted bg, border-border, rounded 6px
- State: Active = primary accent, disabled = muted/50

## Motion & Interaction
- Page transitions: fade 200ms
- Button hover: shadow lift + opacity
- Toggle switches: smooth 150ms transition
- QR scan: scale + fade entrance

## Dark Mode
Emerald primary desaturated to 0.68 L (lighter on dark), accent warmed to 0.72 L. Card surfaces deep (0.15 L). High contrast text maintained.

## Constraints
- NO default Tailwind blues; use emerald throughout
- NO generic grey neutrals; use sophisticated cool greys (0.94–0.98 L)
- Mobile-first, 16px minimum font sizes
- Max 80 character line length in text blocks
- Prefer layered cards over flat sections

## Signature Detail
**QR Accent Frame**: 4px border-primary circular frame around QR code previews. Bold, iconic, owner/finder flow differentiator through color (teal dashboard, neutral finder).

## Differentiation
Owner dashboard vs. finder page: both use same palette, but dashboard emphasizes emerald (trust/security), finder page neutral/white (approachable, no login friction).
