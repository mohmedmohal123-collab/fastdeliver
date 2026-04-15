# FastDeliver Design Brief

## Purpose & Tone
Premium Egyptian delivery logistics platform. Confident, decisive, forward-moving. Balances urgency (delivery's core emotion) with trust (users entrusting packages). Modern luxury courier experience enhanced with warmth (gold accents) for Egyptian character.

## Aesthetic
Bold Energy + Dark Sophistication + Egyptian Warmth. Very dark near-black background (L: 0.11) with vibrant orange-red primary (L: 0.65, C: 0.25, H: 35) for urgency. Deep navy secondary (L: 0.22, C: 0.08, H: 265) for trust. Teal accent (L: 0.72, C: 0.18, H: 200) for location markers. Gold accent (L: 0.68, C: 0.22, H: 85) for warmth and premium feel. Rich gradient overlays on cards and CTAs. Smooth, purposeful animations throughout.

## Typography
| Role | Font | Usage |
|------|------|-------|
| Display | Space Grotesk | Headings, labels, CTAs — bold and modern |
| Body | DM Sans | Content, descriptions, forms — clean and readable |
| Mono | JetBrains Mono | System info, tracking codes, timestamps |

## Color Palette (Light Mode)
| Token | OKLCH | Purpose |
|-------|-------|---------|
| Primary | 0.65 0.25 35 | Orange-red: CTAs, delivery markers, urgency |
| Secondary | 0.22 0.08 265 | Deep navy: trust, tracking info |
| Accent | 0.72 0.18 200 | Teal: location markers, progress indicators |
| Gold | 0.68 0.22 85 | Warm amber: premium accents, highlights |
| Destructive | 0.55 0.22 25 | Red: warnings, cancellations |
| Background | 0.98 0 0 | Off-white: content areas |
| Card | 0.96 0 0 | Elevated surfaces |
| Muted | 0.88 0 0 | Disabled states, secondary text |

## Color Palette (Dark Mode)
| Token | OKLCH | Purpose |
|-------|-------|---------|
| Primary | 0.70 0.28 35 | Bright orange-red: high contrast on dark |
| Secondary | 0.35 0.10 265 | Medium navy: visible in dark |
| Accent | 0.78 0.20 200 | Bright teal: map markers glow |
| Gold | 0.74 0.25 85 | Bright warm gold: premium accents |
| Background | 0.11 0 0 | Very dark (premium, optimal for maps) |
| Card | 0.16 0 0 | Slightly elevated from background |

## Elevation & Depth
- **Ground**: Background (L: 0.11 dark, L: 0.98 light)
- **Level 1**: Card (L: 0.16 dark, L: 0.96 light) + subtle border
- **Level 2**: Elevated surface + shadow-card (0 4px 12px)
- **Level 3**: Popover/modal + shadow-elevated (0 20px 25px)
- **CTA Depth**: Gradient buttons with shadow-elevated, scale-down on active

## Structural Zones
| Zone | Light | Dark |
|------|-------|------|
| Header/Nav | bg-card border-b border-border shadow-card | bg-card border-b border-border shadow-card |
| Main Content | bg-background | bg-background |
| Order Card | bg-card rounded-xl border border-border | bg-card rounded-xl border border-border |
| Sidebar | bg-sidebar | bg-sidebar |
| Footer | bg-muted/40 border-t border-border | bg-muted/20 border-t border-border |

## Component Patterns
- **Buttons**: Gradient primary (orange→teal), gradient warm (orange→gold), solid secondary, outlined tertiary. All with transition-smooth and active:scale-95.
- **Cards**: bg-card with rounded-xl, border-border, shadow-card. Entrance: fade-in-up 0.6s. Glass morphism on overlays with backdrop-blur.
- **Inputs**: bg-input border-border focus:ring-2 ring-primary. Smooth focus states.
- **Progress**: Animated ring spinner for loading, animated progress bars for order stages.
- **Map Markers**: Teal with pulse-ring animation (outward expanding rings).
- **Order Status**: Color-coded badges: pending (muted), accepted (accent), in-transit (primary), delivered (success).

## Motion & Animation
- **Entrance**: fade-in-up 0.6s ease-out for cards. Scale-in 0.5s for modals. Slide-in-up for page transitions.
- **Splash Screen**: Animated logo with scale-in 0.8s, text cascade with fade-in-up staggered delays. Final splash-fade 3s before auto-dismiss to login.
- **Icon Animations**: Delivery truck icon in header with float-subtle (3s). CTA buttons with smooth color transitions and scale-95 on active.
- **Map Markers**: Pulse-ring 2s infinite (expanding rings).
- **Buttons**: Smooth hover state (opacity-90), active state (scale-95) with tactile feedback.
- **Progress**: Rotating spinner while loading, smooth fill for progress bars.
- **Transitions**: transition-smooth (all 0.3s cubic-bezier) for all interactive elements.

## Signature Detail
Animated delivery truck icon in header (Space Grotesk label "FastDeliver") with continuous float animation. Pulsing map markers with expanding ring effects. Gradient buttons with warm/primary variants. Splash screen with cascade animation and welcome message in Arabic+English. Rich gradient overlays on cards (gradient-warm for premium feel).

## Constraints
- Max 3 font families (display, body, mono)
- Max 6 core colors in palette (primary, secondary, accent, gold, destructive, success)
- Dark mode primary (Light 0.70, Chroma 0.28) for high contrast on very dark background
- Bilingual support: Arabic (RTL) and English (LTR) via HTML lang attribute
- Always use semantic color tokens (never raw hex or arbitrary colors)
- Animations use CSS transitions and keyframes only (no external animation libraries)
- Splash screen auto-dismisses after 3s or on user tap, then routes to login
