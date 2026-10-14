---
title: "Shrinking a 3,526-Page Grimoire: How We Cut Incantations from 20 MB to 38 KB"
description: "A deep-dive frontend and static-site generation postmortem on optimizing incantations.tekromancy.com: eliminating 3,371 Framer Motion hydration islands, fixing a 22.7M-operation O(N²) build bottleneck, and cutting initial wire weight by 99.8%."
pubDate: "2026-10-14"
updatedDate: "2026-10-14"
heroImage: "17.jpg"
tags: ["performance", "astro", "architecture", "open-source", "webdev"]
author: "Joshua Edward McLaughlin Cox"
draft: false
---

When we launched [**Incantations**](https://incantations.tekromancy.com)—our open-source grimoire of 3,371 polyglot code patterns, POSIX shell one-liners, esoteric programming languages, and AI prompt structures mapped to the 1994 Gang of Four (*Design Patterns: Elements of Reusable Object-Oriented Software*) taxonomy—the repository scaled far faster than our initial frontend architecture anticipated.

What began as a curated collection of a few hundred spells rapidly expanded to **3,371 markdown entries across 96 programming languages**, generating **3,526 static routes** during `astro build`. While every individual spell scroll (`/[...slug]`) rendered cleanly, our root index page (`dist/index.html`) had quietly ballooned into a **20.0 MB monolith of raw HTML** (~3.4 MB gzipped) that froze the browser main thread for several seconds upon hydration and suffered from severe layout thrashing on every search keystroke.

Here is the complete engineering postmortem of how we diagnosed five compounding bottlenecks across our build pipeline and DOM runtime, and re-architected `incantations.tekromancy.com`—cutting the homepage payload from **20.0 MB down to 254 KB uncompressed (38.2 KB gzipped—a 99.8% reduction vs. raw)** while dropping React hydration islands from **3,380 down to 9**.

---

## 1. The Anatomy of a 20 MB Static Page

Static Site Generators (SSGs) like Astro are famous for shipping "zero JavaScript by default." However, *zero JavaScript by default* does not protect you when you inadvertently instruct the compiler to serialize thousands of React islands and duplicate multi-kilobyte code blocks into a single HTML document.

Profiling the production build of `incantations/apps/web` exposed five distinct performance anti-patterns that had compounded as the content collection grew past 3,000 entries:

```text
+-------------------------------------------------------------------------------+
|                   BEFORE: THE 20.0 MB MONOLITH DOM PIPELINE                   |
+-------------------------------------------------------------------------------+
|                                                                               |
|  [ 3,371 Markdown Files (src/content/incantations/*.md) ]                     |
|            |                                                                  |
|            +--> 150x .filter() passes on index.astro (505,650 iterations)     |
|            +--> O(N^2) related-spell lookup in [...slug].astro (22.7M ops)    |
|            +--> Duplicated 600-line getTypeMeta() switch across 4 templates   |
|            |                                                                  |
|            v                                                                  |
|  [ dist/index.html (20.0 MB Raw HTML / ~3.4 MB Gzipped) ]                     |
|    ├── 3,380 <astro-island> React components (Framer Motion ScrollReveal)     |
|    ├── >115,000 DOM nodes mounted into initial document tree                  |
|    ├── Triple-serialized formulas (data-formula, <astro-island>, <code>)      |
|    ├── 3,371 individual addEventListener("click") bindings on boot            |
|    └── Keypress search runs querySelectorAll().forEach across 3,371 cards     |
|                                                                               |
+-------------------------------------------------------------------------------+
```

### The Five Compounding Bottlenecks

1. **Hydration Island Explosion (3,380 Islands)**: Every card in the main grid was wrapped in `<ScrollReveal client:load>`. In Astro, placing a `client:load` or `client:visible` directive inside a `.map()` loop over 3,371 items emits 3,371 independent `<astro-island>` custom elements. Worse still, Astro serializes the child HTML of each island into its `props` attribute so React can hydrate and reconcile the subtree—instantly **doubling** the HTML byte weight of every card and scheduling 3,371 Framer Motion spring-physics `IntersectionObserver` instances on the main thread.
2. **Triple Formula Serialization**: To power client-side `grep` filtering and clipboard copying, each `<article>` tag stored `data-title`, `data-desc`, `data-pattern`, `data-tags`, and `data-formula={spell.data.formula.toLowerCase()}` directly on the outer DOM node, repeated `data-formula={spell.data.formula}` on the `<button class="copy-formula-btn">`, and rendered `{spell.data.formula}` inside `<pre><code>`. Combined with the `<astro-island>` prop serialization, every multi-line code snippet was written into `dist/index.html` up to **four times**.
3. **Synchronous DOM Reflow Thrashing on Keypress**: Typing a single character into the `mage@tekromancy:~$` terminal search bar triggered a synchronous `.forEach()` over all 3,371 `.incantation-card` DOM elements, calling `getAttribute()` seven times per card and mutating `card.style.display = "flex"` or `"none"`. Mutating layout visibility across 3,371 CSS Grid items forced Chromium's Blink layout engine into a 180–450 ms synchronous style-recalculation and layout-reflow stall on every keystroke.
4. **$O(N^2)$ Static Path Generation (22,727,482 Operations)**: Inside `src/pages/[...slug].astro`, `getStaticPaths()` computed "Related by Language" and "Related by GoF Pattern" by running two full `.filter()` scans over the 3,371-element array *inside* the `.map()` loop ($3,371 \times 3,371 \times 2 = 22,727,482$ comparisons).
5. **150 Redundant Header Filter Passes & Switch Bloat**: The homepage telemetry HUD calculated language badge counters (`cCount`, `rustCount`, `pythonCount`, `malbolgeCount`, `whitespaceCount`, etc.) via 150 separate `allIncantations.filter(...)` calls—iterating over the collection **505,650 times** just to render badge numbers—while a 600-line `getTypeMeta()` `switch` statement was copy-pasted across four page templates.

---

## 2. Eliminating the $O(N^2)$ Build Bottleneck in `getStaticPaths()`

Our first target was the quadratic build-time complexity in `src/pages/[...slug].astro`. Previously, every single spell page scanned the entire 3,371-element collection twice during static path generation to find three related spells of the same language (`type`) and three of the same Gang of Four pattern (`gofPattern`):

```typescript
// ❌ BEFORE: O(N²) nested filter inside map (22,727,482 comparisons)
export async function getStaticPaths() {
	const incantations = await getCollection("incantations");
	return incantations.map((spell, idx) => {
		const relatedLang = incantations
			.filter((s) => s.data.type === spell.data.type && s.id !== spell.id)
			.slice(0, 3);
		const relatedPattern = incantations
			.filter((s) => s.data.gofPattern === spell.data.gofPattern && s.id !== spell.id)
			.slice(0, 3);
		// ...
	});
}
```

Note that `.filter(...).slice(0, 3)` in JavaScript does **not** short-circuit after finding 3 matches: `.filter()` eagerly traverses all 3,371 elements and allocates an intermediate array on the V8 heap before `.slice(0, 3)` discards the rest.

By pre-indexing the collection into two hash maps (`byType` and `byPattern`) in a single $O(N)$ linear pass before mapping routes—and using a bounded `for` loop that terminates the moment `relatedLang.length === 3`—each page's related-content lookup dropped from $O(N)$ to $O(1)$:

```typescript
// ✅ AFTER: O(N) pre-indexed Map buckets + bounded short-circuit (~10,000 ops total)
export async function getStaticPaths() {
	const incantations = await getCollection("incantations");

	const byType = new Map<string, CollectionEntry<"incantations">[]>();
	const byPattern = new Map<string, CollectionEntry<"incantations">[]>();

	for (const item of incantations) {
		const t = item.data.type || "";
		if (t) {
			let list = byType.get(t);
			if (!list) {
				list = [];
				byType.set(t, list);
			}
			list.push(item);
		}

		const p = item.data.gofPattern || "";
		if (p) {
			let list = byPattern.get(p);
			if (!list) {
				list = [];
				byPattern.set(p, list);
			}
			list.push(item);
		}
	}

	return incantations.map((spell, idx) => {
		const typeList = spell.data.type ? (byType.get(spell.data.type) || []) : [];
		const relatedLang: CollectionEntry<"incantations">[] = [];
		for (let i = 0; i < typeList.length && relatedLang.length < 3; i++) {
			if (typeList[i].id !== spell.id) relatedLang.push(typeList[i]);
		}

		const patternList = spell.data.gofPattern ? (byPattern.get(spell.data.gofPattern) || []) : [];
		const relatedPattern: CollectionEntry<"incantations">[] = [];
		for (let i = 0; i < patternList.length && relatedPattern.length < 3; i++) {
			if (patternList[i].id !== spell.id) relatedPattern.push(patternList[i]);
		}

		return {
			params: { slug: spell.id },
			props: {
				spell,
				prevSpell: idx > 0 ? incantations[idx - 1] : null,
				nextSpell: idx < incantations.length - 1 ? incantations[idx + 1] : null,
				relatedLang,
				relatedPattern,
			},
		};
	});
}
```

### Single-Pass Telemetry Aggregation & Constant-Time Metadata Lookup

Next, in `src/pages/index.astro`, we replaced all 150 separate `allIncantations.filter(...)` calls with a single $O(N)$ accumulator pass:

```typescript
// Single-pass count calculation O(N) instead of 150 separate O(N) passes
const typeCounts: Record<string, number> = {};
for (const spell of allIncantations) {
	const t = (spell.data.type || "").toLowerCase();
	typeCounts[t] = (typeCounts[t] || 0) + 1;
}

const cCount = typeCounts["c"] || 0;
const rustCount = typeCounts["rust"] || 0;
const pythonCount = typeCounts["python"] || 0;
// ... all 96 language badges resolved in O(1)
```

We also extracted the duplicated 600-line `getTypeMeta()` switch statements out of `index.astro`, `[...slug].astro`, `category/[category].astro`, and `language/[lang].astro` into a single, frozen dictionary (`TYPE_META_MAP`) in `src/utils/incantationMeta.ts`, accompanied by a reusable, zero-island Astro component (`src/components/IncantationCard.astro`).

---

## 3. Progressive Grid Architecture & Sub-Millisecond In-Memory Search

The most impactful architectural shift came from questioning a fundamental assumption: *Why were we shipping all 3,371 DOM cards inside the initial HTML response?*

No human reads 3,371 code cards simultaneously on initial page load. Users either inspect the top row of spells, click a language or Gang of Four category filter pill, or immediately press `/` (or `Ctrl+K`) to search the terminal prompt. Furthermore, search engines already crawl every individual spell page via our `/sitemap-index.xml`, `/language/[lang]`, and `/category/[category]` hub pages.

We replaced the 3,371-card static dump with a **Hybrid Progressive Grid**:

```text
+-------------------------------------------------------------------------------+
|               AFTER: PROGRESSIVE GRID & IN-MEMORY SEARCH ENGINE               |
+-------------------------------------------------------------------------------+
|                                                                               |
|  1. Initial Server HTML Paint (<50ms FCP):                                    |
|     └── Server renders top 24 cards statically via <IncantationCard />        |
|     └── 254 KB raw HTML (38.2 KB gzipped) — 99.8% smaller wire transfer       |
|     └── Zero React islands on cards; GPU CSS @keyframes cardFadeIn            |
|                                                                               |
|  2. Background Idle Prefetch (requestIdleCallback):                           |
|     └── Streams /incantations.json (compact 1-char keys, immutable cache)     |
|                                                                               |
|  3. Sub-Millisecond Search & Infinite Scroll:                                 |
|     └── Keystrokes filter in-memory JS array in <0.6ms (60 FPS, zero reflow)  |
|     └── IntersectionObserver (rootMargin: "600px") appends 24-card batches    |
|     └── Single delegated click listener on #incantations-grid handles copies  |
|                                                                               |
+-------------------------------------------------------------------------------+
```

### Static JSON Index Endpoint (`src/pages/incantations.json.ts`)

During `astro build`, a static endpoint emits `/incantations.json` using single-character property keys (`id`, `t` for title, `d` for description, `y` for language type, `c` for GoF category, `p` for GoF pattern, `f` for formula, `g` for tags, `s` for arcane school, and `df` for difficulty) with `Cache-Control: public, max-age=31536000, immutable`:

```typescript
import { getCollection } from "astro:content";

export async function GET() {
	const isDev = import.meta.env.DEV;
	const allIncantations = (
		await getCollection("incantations", ({ data }) => isDev || !data.draft)
	).sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());

	const data = allIncantations.map((spell) => ({
		id: spell.id,
		t: spell.data.title,
		d: spell.data.description,
		y: spell.data.type || "",
		c: spell.data.gofCategory || "",
		p: spell.data.gofPattern || "",
		f: spell.data.formula || "",
		g: spell.data.tags || [],
		s: spell.data.arcaneSchool ? spell.data.arcaneSchool.split("//")[0].trim() : "",
		df: spell.data.difficulty || "Adept",
	}));

	return new Response(JSON.stringify(data), {
		headers: {
			"Content-Type": "application/json",
			"Cache-Control": "public, max-age=31536000, immutable",
		},
	});
}
```

### Idle Prefetching & Batch Virtualization (`src/pages/index.astro`)

When the homepage loads, the browser immediately paints the first 24 server-rendered `<IncantationCard />` components with zero blocking scripts. Once the main thread is idle (`window.requestIdleCallback`), or immediately when the user focuses the search input or scrolls within `600px` of the bottom `#scroll-sentinel`, the client fetches `/incantations.json` once and caches it in memory:

```javascript
var BATCH_SIZE = 24;
var allSpells = null;
var filteredSpells = [];
var renderedCount = 24;

function doFilter() {
	if (!allSpells) {
		fetchAllSpells(doFilter);
		return;
	}
	var q = currentQuery.toLowerCase().trim();
	var f = currentFilter.toLowerCase();

	filteredSpells = allSpells.filter(function (s) {
		var matchFilter = f === "all" ||
			(s.y && s.y.toLowerCase() === f) ||
			(s.c && s.c.toLowerCase() === f);
		if (!matchFilter) return false;
		if (!q) return true;

		return (
			(s.t && s.t.toLowerCase().indexOf(q) !== -1) ||
			(s.d && s.d.toLowerCase().indexOf(q) !== -1) ||
			(s.p && s.p.toLowerCase().indexOf(q) !== -1) ||
			(s.f && s.f.toLowerCase().indexOf(q) !== -1) ||
			(s.g && s.g.some(function (tag) { return tag.toLowerCase().indexOf(q) !== -1; })) ||
			(s.y && s.y.toLowerCase().indexOf(q) !== -1)
		);
	});

	renderedCount = Math.min(BATCH_SIZE, filteredSpells.length);
	renderBatch(false);
}
```

Because `doFilter()` searches a plain V8 array in memory and only renders `BATCH_SIZE = 24` cards into `#incantations-grid` at a time (appending subsequent 24-card batches on scroll via `IntersectionObserver`), filtering 3,371 spells takes **less than 0.6 milliseconds**—eliminating DOM reflow lag entirely.

### Event Delegation Over 3,371 Listeners

Previously, the page ran `document.querySelectorAll(".copy-formula-btn").forEach(...)` to bind 3,371 separate click handlers on startup. Furthermore, dynamically appended cards wouldn't have had listeners bound without re-querying the DOM. We replaced all 3,371 listeners with a single delegated listener on `#incantations-grid`:

```javascript
grid.addEventListener("click", function (e) {
	var btn = e.target.closest(".copy-formula-btn");
	if (!btn) return;
	e.preventDefault();
	e.stopPropagation();
	var formula = btn.getAttribute("data-formula") || "";
	var textEl = btn.querySelector(".btn-text");
	if (navigator.clipboard && formula) {
		navigator.clipboard.writeText(formula).then(function () {
			if (textEl) textEl.textContent = "COPIED! ✓";
			btn.style.backgroundColor = "#22EE44";
			btn.style.color = "#000000";
			setTimeout(function () {
				if (textEl) textEl.textContent = "Copy Incantation";
				btn.style.backgroundColor = "";
				btn.style.color = "";
			}, 2000);
		});
	}
});
```

---

## 4. CSS `content-visibility: auto` Virtualization on Category Hubs

For static category archives like `/category/behavioral` (which renders all 1,608 behavioral design pattern spells in static HTML for full crawler indexing), we still needed the full list in the DOM without paying the layout and paint cost of 1,608 cards on initial load.

We stripped out the 1,608 `<ScrollReveal client:visible>` React islands from `src/pages/category/[category].astro` and `src/pages/language/[lang].astro`, and introduced native CSS layout containment in `src/styles/global.css`:

```css
/* Performance Optimization: Content Visibility & Hardware-Accelerated Fade */
.contain-card {
  content-visibility: auto;
  contain-intrinsic-size: 0 350px;
}

@keyframes cardFadeIn {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-card-fade {
  animation: cardFadeIn 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
```

With `content-visibility: auto` and `contain-intrinsic-size: 0 350px`, the browser's rendering engine skips style calculation, layout, and painting for offscreen `.contain-card` elements until they approach the viewport, while using the `350px` intrinsic height placeholder to maintain smooth scrollbar geometry.

---

## 5. Production Benchmark Results

We verified the production build across all 3,526 routes and ran automated headless Chromium telemetry checks via the Chrome DevTools Protocol (CDP):

| Metric | Before Optimization | After Optimization | Improvement |
| :--- | :---: | :---: | :---: |
| **Homepage Raw HTML (`dist/index.html`)** | 20.0 MB | **254 KB** | **98.7% smaller** |
| **Homepage Wire Transfer (Gzipped)** | ~3.4 MB | **38.2 KB** | **99.8% reduction vs. raw** |
| **Homepage `<astro-island>` Count** | 3,380 islands | **9 islands** | **99.7% reduction** |
| **`/category/behavioral` Island Count** | 1,608 islands | **4 islands** | **99.8% reduction** |
| **`/category/behavioral` HTML Size** | 8.2 MB | **3.5 MB** | **57.3% smaller** |
| **`[...slug].astro` Path Lookups** | 22,727,482 ops ($O(N^2)$) | **~10,000 ops ($O(N)$)** | **2,200x fewer ops** |
| **Homepage Counter Iterations** | 505,650 iterations | **3,371 iterations** | **150x faster** |
| **Search / Filter Input Latency** | 180–450 ms (UI freeze) | **< 0.6 ms** | **Instant 60 FPS** |
| **Full Monorepo Build Time (3,526 pages)** | 22.80s | **18.68s** | **18.1% faster SSG** |

---

## 6. Key Takeaways for High-Scale Astro & Static Sites

1. **Never Put Hydration Directives Inside Large Collection Loops**: Wrapping a list item in `<Component client:load>` or `<Component client:visible>` scales linearly with collection size—and serializes the child HTML twice (once in the DOM, once in the `<astro-island>` `props` attribute). What feels weightless at 20 items will cripple the main thread at 3,000 items. Prefer pure CSS `@keyframes` and `content-visibility: auto`.
2. **Pre-Index Collections Before `getStaticPaths()`**: If every static page computes "related posts" via `.filter()`, your build time will hit an $O(N^2)$ quadratic wall. Build `Map<string, Entry[]>` lookup tables once outside the `.map()` return and short-circuit once you collect $K$ items.
3. **Decouple Initial Paint from Full-Collection Search**: Render the first 24 items statically in HTML for instant First Contentful Paint (FCP) and SEO, then stream a compact JSON index during browser idle time (`requestIdleCallback`) for sub-millisecond in-memory search and `IntersectionObserver` infinite scroll.

Explore the newly optimized grimoire live at [**incantations.tekromancy.com**](https://incantations.tekromancy.com).
