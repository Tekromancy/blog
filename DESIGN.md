---
name: Tekromancy
description: Tekromancy, Infrastructure & Code — OLED-black practitioner cockpit and interactive systems field manual
colors:
  signal-emerald: "#22c55e"
  phosphor-vector: "#22EE44"
  canopy-relay: "#16a34a"
  muted-moss: "#577361"
  field-sage: "#4f6456"
  oled-void: "#000000"
  chassis-carbon: "#0a0e0b"
  elevated-bunker: "#121914"
  trace-hairline: "#1a291f"
  subtrace-divider: "#131f17"
  amber-telemetry: "#f59e0b"
  fault-crimson: "#ef4444"
  packet-azure: "#3b82f6"
typography:
  display:
    fontFamily: "\"JetBrains Mono\", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace"
    fontSize: "3rem"
    fontWeight: 800
    lineHeight: 1.04
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "\"JetBrains Mono\", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace"
    fontSize: "2.25rem"
    fontWeight: 700
    lineHeight: 1.25
    letterSpacing: "-0.025em"
  title:
    fontFamily: "\"JetBrains Mono\", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace"
    fontSize: "1.25rem"
    fontWeight: 700
    lineHeight: 1.25
    letterSpacing: "0em"
  body:
    fontFamily: "\"Space Grotesk\", ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.65
    letterSpacing: "0em"
  label:
    fontFamily: "\"JetBrains Mono\", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace"
    fontSize: "0.75rem"
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: "0.025em"
rounded:
  none: "0px"
  sm: "0.125rem"
  md: "0.375rem"
  lg: "0.5rem"
  xl: "0.75rem"
  2xl: "1rem"
  full: "9999px"
spacing:
  xs: "0.5rem"
  sm: "0.75rem"
  md: "1rem"
  lg: "1.5rem"
  xl: "2.25rem"
  2xl: "3.5rem"
  3xl: "5rem"
components:
  button-primary:
    backgroundColor: "{colors.signal-emerald}"
    textColor: "{colors.oled-void}"
    typography: "{typography.label}"
    rounded: "{rounded.lg}"
    padding: "0.85rem 1.8rem"
  button-secondary:
    backgroundColor: "{colors.oled-void}"
    textColor: "{colors.phosphor-vector}"
    typography: "{typography.label}"
    rounded: "{rounded.lg}"
    padding: "0.85rem 1.8rem"
  chip-filter:
    backgroundColor: "{colors.chassis-carbon}"
    textColor: "{colors.phosphor-vector}"
    typography: "{typography.label}"
    rounded: "{rounded.full}"
    padding: "0.25rem 0.75rem"
  chip-filter-active:
    backgroundColor: "{colors.signal-emerald}"
    textColor: "{colors.oled-void}"
    typography: "{typography.label}"
    rounded: "{rounded.full}"
    padding: "0.25rem 0.75rem"
  input-terminal:
    backgroundColor: "{colors.oled-void}"
    textColor: "{colors.phosphor-vector}"
    typography: "{typography.label}"
    rounded: "{rounded.xl}"
    padding: "0.625rem 1rem"
  card-dispatch:
    backgroundColor: "{colors.chassis-carbon}"
    textColor: "{colors.phosphor-vector}"
    rounded: "{rounded.xl}"
    padding: "1.5rem"
  plate-architectural:
    backgroundColor: "{colors.chassis-carbon}"
    textColor: "{colors.phosphor-vector}"
    rounded: "{rounded.2xl}"
    padding: "3.5rem 1.75rem"
  ledger-cell:
    backgroundColor: "{colors.chassis-carbon}"
    textColor: "{colors.phosphor-vector}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "0.95rem 0.75rem"
---

# Design System: Tekromancy

## Overview

**Creative North Star: "The Sovereign Telemetry Deck"**

Tekromancy's visual language merges an OLED-black hardware instrumentation cockpit with an architectural systems field manual. Every screen is built for practicing kernel, infrastructure, and security engineers: high-contrast, surgical, and visibly grounded in real telemetry rather than decorative theater. High-voltage cybernetic craft—circuit-trace header rails, live client telemetry strips, masked vector schematics, and interactive parameter decks—frames the perimeter, while long-form dispatches and code blocks settle into disciplined, distraction-free dark chambers.

Although the canonical baseline ships in dark-mode green (`data-theme="green"` and `data-mode="dark"`), the entire interface is engineered atop semantic `--token-*` CSS custom properties that adapt smoothly across six user-selectable palettes (`green`, `obsidian`, `aurora`, `blue`, `purple`, `orange`) and light/dark modes. Regardless of active theme, dark mode enforces zero-illumination subpixel black on the root canvas, tight `1px` hairline structural divisions, and immediate tactile feedback on interactive controls.

The system explicitly rejects pastel SaaS templates, uniform icon-heading-blurb marketing grids, gratuitous frosted-glass blur layers, eyebrow kickers above display headings, emoji icons, and ungrounded sci-fi ornament that carries no functional state or meaning.

**Key Characteristics:**
- **Zero-Subpixel OLED Canvas:** Dark mode anchors to pure `#000000` (`--token-color-background`), lifting content onto subtle carbon chambers (`#0a0e0b`, `#121914`) divided by `1px` hairline rules (`#1a291f`).
- **Instrumented Perimeter, Quiet Reading Core:** High-energy cybernetic chrome lives in the sticky navigation cockpit, telemetry HUD bar, and interactive React simulators; article prose maintains clean 65–75ch measure and high-contrast legibility.
- **Tactile Hardware Controls:** Tight corner radii (`0.5rem`–`1rem`), monospace command labels, CLI-inspired search prompts (`root@tekromancy:~$`), and crisp `translateY(-1px)` or border-illumination hover responses.
- **Live Token Portability:** Components bind to `var(--token-color-*)`, `var(--token-radius-*)`, and `var(--token-motion-*)` so user theme/mode switches transition cleanly in `200ms` without layout shift.

## Colors

A high-contrast cathode-emerald and carbon palette anchored on pure OLED black, designed to evoke precision oscilloscopes, PCB solder masks, and sovereign terminal instrumentation while scaling cleanly across alternate `--token-color-*` theme overrides.

### Primary
- **Signal Emerald** (`#22c55e` / `--token-color-primary`): Primary interactive fills, active tag pills, vector icon strokes, strong state borders (`--token-color-border-strong`), and directional button glow. Paired exclusively with **OLED Void** (`#000000`) foreground text for crisp legibility on solid fills.
- **Phosphor Vector** (`#22EE44` / `--token-color-text-primary`, `--token-color-focus`): High-luminance phosphor green reserved for display headlines, primary dark-mode typography, keyboard `:focus-visible` rings (`2px solid`), and live counter readouts.

### Secondary
- **Canopy Relay** (`#16a34a` / `--token-color-text-secondary`): Secondary metadata, subheadings, and supporting technical labels where full phosphor brightness would compete with primary hierarchy.
- **Muted Moss** (`#577361` / `--token-color-secondary`) & **Field Sage** (`#4f6456` / `--token-color-accent`): Desaturated structural greens for secondary badges, subtle surface tints, and non-primary accents.

### Tertiary
- **Amber Telemetry** (`#f59e0b` / `--token-color-warning`): Latency warnings, SPDK CPU-polling alerts, and caution states inside interactive simulators and callouts.
- **Fault Crimson** (`#ef4444` / `--token-color-error`): Validation errors, destructive/blocked states, and zero-result query alerts.
- **Packet Azure** (`#3b82f6` / `--token-color-info`): Informational telemetry series, secondary benchmark bars, and protocol comparison traces inside interactive labs.

### Neutral
- **OLED Void** (`#000000` / `--token-color-background`, `--token-color-primary-foreground`): The document root canvas in dark mode, secondary button interiors, CLI input wells, and high-contrast text atop **Signal Emerald** fills.
- **Chassis Carbon** (`#0a0e0b` / `--token-color-surface`): First-tier elevated container fill for architectural hero plates, docked domain ledgers, dispatch cards, and markdown code blocks.
- **Elevated Bunker** (`#121914` / `--token-color-surface-elevated`): Second-tier surface for nested simulator metric readouts, dropdown menus, and active HUD panels.
- **Trace Hairline** (`#1a291f` / `--token-color-border`) & **Subtrace Divider** (`#131f17` / `--token-color-border-muted`): Crisp `1px` structural borders separating plates, ledger cells, table rows, and card edges without heavy drop shadows.

### Named Rules
**The OLED Zero-Floor Rule.** In dark mode (`[data-mode="dark"]`), `--token-color-background` is always pure `#000000`; depth builds upward through carbon surfaces and `1px` hairlines rather than muddy charcoal page backgrounds.

**The Tinted Secondary Copy Rule.** Never drop raw mid-gray text onto dark emerald or themed surfaces; blend secondary body copy from `--token-color-text-primary` and `--token-color-background` (e.g. `80%` foreground mix) so contrast stays comfortably above `4.5:1` across every theme.

**The Token-First Binding Rule.** Author components against `var(--token-color-*)` custom properties with canonical dark-emerald fallbacks rather than hardcoded hex values so all six site themes remain coherent.

## Typography

**Display Font:** JetBrains Mono (with `ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace` fallback)
**Body Font:** Space Grotesk (with `ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif` fallback)
**Label/Mono Font:** JetBrains Mono (`--token-font-family-mono`)

**Character:** Precision monospace anchors display titles, section headers, navigation ledgers, CLI prompts, and tabular simulator telemetry, while clean geometric sans-serif carries long-form engineering prose and analytical explanations without eye fatigue.

### Hierarchy
- **Display** (`800` weight, `clamp(2.85rem, 5vw, 5rem)` / `3rem` token base, `1.04` line-height, `-0.035em` tracking): Page-defining titles in the Hero chamber and primary route headers, set with `text-wrap: balance`.
- **Headline** (`700` weight, `1.875rem`–`2.25rem`, `1.25` line-height, `-0.025em` tracking): Major section dividers (`Recent Dispatches`, `Technical Domains`) and article `<h2>` anchors.
- **Title** (`700` weight, `1.25rem`, `1.25` line-height, `0em` tracking): Dispatch card titles, simulator header bars, and domain panel headings.
- **Body** (`400` weight, `1rem`–`1.125rem`, `1.65`–`1.75` line-height): Long-form technical articles, architectural descriptions, and hero lead copy, constrained to a `62ch`–`72ch` reading measure (`<strong>` at `600` weight in primary foreground).
- **Label** (`500`–`600` weight, `0.75rem`–`0.875rem`, `1.25` line-height, `0.025em` tracking): Button captions, `#tag` filter chips, ledger cells, author role badges, and simulator metric headers.

### Named Rules
**The Earned Monospace Rule.** Monospace is reserved for structural titles, executable code, CLI inputs, tags, and quantitative telemetry (`tabular-nums`); never set multi-paragraph reading prose in monospace.

**The No-Kicker Rule.** Display and section headings stand on their own typographic weight—never place decorative uppercase eyebrow or kicker badges directly above a heading when the heading itself names the section.

## Layout

Tekromancy uses a centered, responsive container hierarchy that scales width to match cognitive mode:
- **Navigation Cockpit (`max-width: 1600px`):** Full-bleed sticky header (`top: 0`, `z-index: 50`) housing the live `CyberTelemetryBar` above a `56px`–`62px` framed circuit chassis (`px-2` mobile, `px-4` desktop).
- **Showcase & Architectural Plates (`max-width: 72rem` / `1152px`):** Used for the Hero architectural plate, 3-column dispatch grids (`1fr` mobile → `repeat(2, 1fr)` at `768px` → `repeat(3, 1fr)` at `1024px`, `1.5rem` gap), `/apps` showcases, and `/events` tactical listings.
- **Long-Form Reading & Manifestos (`max-width: 56rem` / `896px`, prose measure `62ch`–`72ch`):** Used on `/blog/[...slug]` and `/about` so dense kernel explanations, math formulas, and code blocks read cleanly alongside a sticky Table of Contents and top `ReadingProgressBar`.

Vertical section rhythm steps cleanly from `4rem` (`64px`) on mobile viewports to `5rem`–`5.5rem` (`80px`–`88px`) on desktop (`≥768px`), separated by `1px solid var(--token-color-border)` structural rules rather than excessive blank void. Inside multi-item plates—such as the Hero's docked 5-domain ledger (`2` columns on mobile → `5` equal columns at `≥900px`)—items pack edge-to-edge separated by `1px` hairlines (`gap: 0`) to read as a unified hardware instrument panel.

## Elevation & Depth

Tekromancy uses **hybrid structural layering**: surfaces sit flat inside `1px` hairline-bordered carbon plates at rest, reserving directional, emerald-tinted offset shadows strictly for primary architectural plates, primary action buttons, sticky navigation chrome, and active `:hover` micro-lifts. Zero-offset decorative neon halos and heavy multi-layer drop shadows on ordinary cards are avoided.

### Shadow Vocabulary
- **Subtle Rest** (`box-shadow: 0 1px 2px 0 rgb(34 197 94 / 0.1)` / `--token-shadow-1`): Minimal separation for compact controls when tonal contrast alone is insufficient.
- **Tactile Card Lift** (`box-shadow: 0 4px 6px -1px rgb(34 197 94 / 0.45), 0 2px 4px -2px rgb(34 197 94 / 0.4)` / `--token-shadow-3`): Applied on `:hover` for interactive domain and dispatch cards alongside border illumination.
- **Primary Action Depth** (`box-shadow: 0 6px 18px -4px color-mix(in srgb, var(--token-color-primary) 42%, transparent)`): Directional downward lift under primary solid CTA buttons, deepening to `0 10px 22px -4px` with `translateY(-1px)` on `:hover`.
- **Architectural Plate Depth** (`box-shadow: 0 10px 22px -16px color-mix(in srgb, var(--token-color-primary) 22%, rgba(0, 0, 0, 0.7))`): Grounded, low-spread shadow anchoring primary framed chambers like the Hero plate against `#000000`.
- **Inset Telemetry Well** (`box-shadow: inset 0 2px 4px 0 rgb(34 197 94 / 0.1)` / `--token-shadow-inner`): Recessed feel for CLI input prompts and header circuit-trace channels.

### Named Rules
**The Flat-At-Rest Card Rule.** Repeating grid cards (`Features`, `Recent Dispatches`, `RelatedPosts`) sit flat at rest inside a `1px` `Trace Hairline` border; shadow and border-color shifts fire only in response to pointer hover or keyboard focus.

## Shapes

The form language pairs **machined outer plates** with **crisp inner instrumentation**:
- **Architectural Plates (`1rem` / `--token-radius-2xl`):** Outer shells for hero chambers, embedded React simulators, and featured application showcases, always clipped with `overflow: hidden` so docked child bars share the outer curve cleanly.
- **Cards & Terminal Wells (`0.75rem` / `--token-radius-xl`):** Article cards, domain feature panels, and the `root@tekromancy:~$` search bar.
- **Buttons & Code Blocks (`0.5rem` / `--token-radius-lg`):** Primary/secondary CTAs and `<pre>` syntax blocks.
- **Inline Badges (`0.375rem` / `--token-radius-md`) & Filter Pills (`9999px` / `--token-radius-full`):** Compact rectangular tags for structural metadata (`Author` roles) versus full-pill `#tag` toggles in interactive filter matrices.
- **Docked Ledger Cells (`0px` / `--token-radius-none`):** Flush internal cells inside framed plates, separated by `1px` `border-right` / `border-top` hairlines.
- **Masked Vector Linework:** Architectural SVG backgrounds (`sketch.svg`) sit behind content at `0.3` opacity inside a radial alpha mask (`radial-gradient(circle at 50% 45%, #000 30%, transparent 92%)`) so linework fades smoothly before touching container borders.

## Components

### Buttons
Crisp, tactile hardware triggers with monospace labels and immediate micro-lift feedback.
- **Shape:** Moderately rounded corners (`0.5rem` / `--token-radius-lg`), full-width on narrow mobile (`<640px`) and auto-width inline-flex (`gap: 0.55rem`) on desktop.
- **Primary:** Solid **Signal Emerald** (`#22c55e`) fill, **OLED Void** (`#000000`) `600`-weight monospace text (`0.875rem`), `0.85rem 1.8rem` padding, paired with a `20px` stroke icon and directional primary shadow.
- **Hover / Focus:** Lifts `translateY(-1px)` (`180ms cubic-bezier(0.16, 1, 0.3, 1)`) with intensified downward shadow; `:focus-visible` renders a `2px solid` **Phosphor Vector** (`#22EE44`) outline (`outline-offset: -2px` or `2px`).
- **Secondary:** **OLED Void** (`#000000`) fill with `1px solid` **Trace Hairline** (`#1a291f`) border and **Phosphor Vector** text; `:hover` shifts border to **Signal Emerald** and background to `--token-color-hover` (`rgba(34, 238, 68, 0.12)`).

### Chips
Compact monospace `#tag` selectors used in `/blog` search/filtering and post metadata.
- **Style:** Full pill radius (`9999px`), `0.75rem` monospace medium text, `0.25rem 0.75rem` padding.
- **State:** Unselected chips sit on translucent dark surface (`rgba(255, 255, 255, 0.05)` or `Chassis Carbon`) with a `1px` subtle border; active/selected chips invert to solid **Signal Emerald** (`#22c55e`) background with `#000000` `700`-weight text.

### Cards / Containers
Structured dark vessels for technical dispatches, domain links, and author profiles.
- **Corner Style:** `0.75rem` (`--token-radius-xl`) with `overflow: hidden`.
- **Background:** **Chassis Carbon** (`#0a0e0b`) or **OLED Void** (`#000000`) depending on parent surface contrast.
- **Shadow Strategy:** Flat at rest (`box-shadow: none`); elevates on `:hover` with `--token-shadow-2` / `--token-shadow-3`.
- **Border:** `1px solid` **Trace Hairline** (`#1a291f`), illuminating toward **Signal Emerald** (`50%`–`100%`) on `:hover`.
- **Internal Padding:** `1.5rem` (`24px`) for standard grid cards; `1.5rem`–`2.5rem` for featured application showcases; `16:9` (`aspect-video`) top media slot with subtle `scale(1.05)` image zoom (`500ms`) on card hover.

### Inputs / Fields
CLI-styled command inputs led by the `/blog` live filter bar.
- **Style:** `0.75rem` (`--token-radius-xl`) container on `rgba(0, 0, 0, 0.8)` with `1px solid` hairline border, prefixed by an inline bold monospace prompt (`root@tekromancy:~$` in `#22EE44`) and suffixed by a `/` shortcut keycap hint and `ESC` clear button.
- **Focus:** Container `focus-within` shifts border to **Phosphor Vector** (`#22EE44`) with a `1px` matching ring; native browser outline inside the bare `<input>` is suppressed in favor of the outer shell focus ring.

### Navigation
A sticky dual-deck cybernetic cockpit (`Header.astro` + `CyberTelemetryBar.astro`).
- **Top Deck (`CyberTelemetryBar`):** Compact live client telemetry readout and procedural zero-dependency WebAudio FX controls.
- **Main Chassis:** `56px`–`62px` tall motherboard trace strip framed by left/right SVG spark-plug endcaps and repeating top/bottom lightning rails, housing the glowing Tekromancy SVG wordmark, SVG/monospace route items (`Articles`, `Incantations`, `Systems` dropdown, `Apps`, `Events` with live pulse dot, `About`), `ThemeSwitcher`, and `ModeToggle`. Mobile collapses into a slide-down bordered drawer preserving all route links and theme controls.

### Framed Architectural Plate & Domain Ledger
The signature entry composition (`Hero.astro`).
- **Structure:** A `1rem`-rounded `1px`-bordered **Chassis Carbon** plate split vertically into two docked zones: an upper centered statement chamber (`3.5rem 1.75rem` mobile, `5rem 3.5rem` desktop) over radially masked `sketch.svg` linework, and a lower `5`-column horizontal domain ledger (`border-top: 1px solid var(--token-color-border)`) where each cell pairs a `16px` **Signal Emerald** Tabler vector icon with a monospace domain label and `1px` cell dividers.

### Interactive Systems Simulator
Embedded client-side React 19 engineering labs (`src/components/interactive/*.tsx`).
- **Structure:** `1rem`-rounded dark instrument panels (`#0a0e17` / `Chassis Carbon`) featuring a top HUD status bar with pulsing live indicator dot, segmented tab switchers (`1px` active accent border + tinted fill), interactive parameter sliders/selectors, `tabular-nums` metric readout tiles (`Elevated Bunker`), and dynamic verdict callouts.

## Do's and Don'ts

### Do:
- **Do** bind colors, radii, shadows, and transitions to `--token-*` CSS custom properties so components adapt across all six themes and both light/dark modes.
- **Do** use consistent `1.5px`–`2px`-stroke vector icons (Tabler via `astro-icon` or inline SVG) sized explicitly (`16px`–`24px`) instead of Unicode emoji in navigation, tags, and buttons.
- **Do** keep `1px` structural hairlines (`--token-color-border`) crisp and uniform; never use thick `3px`–`4px` colored `border-left` stripes on cards or callouts.
- **Do** theme browser-native surfaces—`::selection` (`--token-color-active` background with `--token-color-text-primary` text), `:focus-visible` outlines (`2px solid var(--token-color-focus)`), and `tabular-nums` on live counters and simulator metrics.
- **Do** honor `prefers-reduced-motion: reduce` when adding transitions or entrance choreography.

### Don't:
- **Don't** place uppercase kicker or eyebrow labels directly above `<h1>` or `<h2>` headings; let the monospace display hierarchy carry the section title alone.
- **Don't** apply CSS gradient text (`background-clip: text`) or zero-blur neobrutalist block shadows (`4px 4px 0`).
- **Don't** attach inline JavaScript `onmouseenter` / `onmouseleave` style mutators in Astro templates; author `:hover` and `:focus-visible` states in CSS.
- **Don't** use `--token-color-text-muted` (`#15803d` in dark green, `4.26:1` on `#000000`) for body-sized prose on pure black; use `--token-color-text-secondary` or an `80%` `color-mix` of `--token-color-text-primary` to maintain `≥4.5:1` contrast.
- **Don't** nest bordered cards inside bordered cards; decompose multi-part surfaces with `1px` internal hairline dividers (like the docked Hero ledger) instead.
