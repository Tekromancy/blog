# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Practicing systems, infrastructure, and security engineers, architects, and technical builders evaluating bare-metal Linux internals, Kubernetes orchestration, AI/ML infrastructure, distributed networking, cryptographic security, and sovereign client utilities.

## Product Purpose

Tekromancy (`https://tekromancy.com`) is a deep-systems engineering publication, interactive simulation lab, sovereign software showcase, and security community hub. Success means visitors achieve concrete, down-to-the-metal comprehension of complex infrastructure through long-form technical dispatches and interactive browser simulators, while discovering Tekromancy's privacy-first applications (`/apps`) and community field operations (`/events`).

## Positioning

Combines unapologetically low-level engineering dispatches—grounded in real Linux syscalls, kernel subsystems, wire protocols, and production configurations—directly with embedded, zero-backend interactive simulators (`src/components/interactive/`), alongside native Android and browser utilities engineered for 100% on-device execution with zero surveillance telemetry.

## Operating Context

- **Reading & Interactive Lab (`/blog`, `/tags`, `/author`)**: Engineers read long-form Markdown/MDX dispatches (`src/content/blog/`) and manipulate embedded React 19 simulators to test storage engines, kernel schedulers, CXL memory tiering, post-quantum meshes, and hardware security trade-offs directly in the browser.
- **Sovereign Applications Showcase (`/apps`)**: Visitors inspect specifications, interactive calculators/demos, and release channels for Tekromancy tools (`SpareTank`, `Silent Mode Control`, `Coordy`) defined in `src/data/apps.ts`.
- **Field Operations & Events (`/events`)**: Security practitioners track Austin, TX and community Capture The Flag (CTF) wargames, meetups, and technical briefings defined in `src/data/events.ts`.
- **Publishing & Syndication**: Static Astro builds generate per-article Satori OpenGraph cards (`/og/*.png`), RSS feeds (`/rss.xml`), sitemaps, and Schema.org JSON-LD metadata.

## Capabilities and Constraints

- **Architecture**: Static-first Astro 7 (`output: "static"`) with React 19 islands, Tailwind CSS 4, TypeScript, Satori/Resvg OG generation, and `pnpm` (`Node >=22.12.0`). Interactive labs execute purely client-side without backend database dependencies.
- **Multi-Author Attribution**: Posts support single and shared authorship via `src/data/authors.ts` (`Joshua Edward McLaughlin Cox`, `Tekromancy Collective`, `DeployCoop Core Team`, plus automatic fallback profiles for guest authors).
- **Interactive Site Controls**: Multi-theme and light/dark mode switching (`ThemeSwitcher.tsx`, `ModeToggle.tsx`) persisted across Astro `ClientRouter` transitions, paired with the procedural zero-dependency WebAudio FX engine and `CyberTelemetryBar.astro`.
- **Analytics & Monetization Hooks**: Existing Google Tag Manager (`GTM-TKGX6K5`), Google Analytics (`G-YBFSBJRJK8`), and Google AdSense (`ca-pub-8973108060277483`) integrations in `src/layouts/Layout.astro` and `src/config/site.mjs` must be preserved.
- **Open Decisions**: Contact form backend key (`web3formsAccessKey` in `src/config/site.mjs`) is currently unset.

## Brand Commitments

- **Identity & Voice**: **Tekromancy** ("Tekromancy, Infrastructure & Code") speaks with direct, rigorous, practitioner-grade authority—demystifying systems down to hardware and kernel primitives without marketing fluff or shallow summaries.
- **Client App Privacy**: Tekromancy client utilities (`SpareTank`, `Silent Mode Control`, `Coordy`) operate on-device without user-tracking telemetry or ad networks inside the apps.

## Evidence on Hand

- **Published Dispatches & Artwork**: Long-form technical articles in `src/content/blog/`, hero artwork in `src/assets/blog/` (`src/utils/blogImages.ts`), and technical architecture schematics in `public/images/`.
- **Interactive Simulators**: 24 domain-specific React simulators in `src/components/interactive/`.
- **Registries**: Structured application metadata in `src/data/apps.ts`, community events in `src/data/events.ts`, and author profiles in `src/data/authors.ts`.
- **Explicit Absences (Do Not Fabricate)**: No paid subscription tiers on `tekromancy.com`, no customer testimonials or enterprise logos, no fabricated install/download metrics, and no invented benchmark numbers.

## Product Principles

1. **Down to the Metal**: Ground every technical claim in real configurations, kernel mechanics, hardware behavior, or protocol internals—never substitute buzzwords or fabricated benchmarks.
2. **Comprehension Through Interactive Proof**: Pair dense architectural trade-offs with client-side interactive simulators so readers can test parameters firsthand.
3. **Sovereign by Default**: Prioritize open-source/open-weight ecosystems, static reproducible publishing, and zero-telemetry client utilities over opaque SaaS lock-in.
4. **Preserve Core Site Capabilities**: Respect multi-author attribution, persisted multi-theme + procedural WebAudio controls, Astro view transitions, and syndication/analytics integrations across every surface update.
