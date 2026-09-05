# Contributing to Tekromancy

Thank you for contributing to **Tekromancy**! We welcome technical deep dives, architectural field notes, post-mortems, and tutorials exploring Linux internals, Kubernetes orchestration, AI/ML systems, distributed networking, and cybersecurity.

This guide details the step-by-step workflow for authoring a blog post, setting up single or shared authorship, registering your author profile, and submitting a Pull Request (PR).

---

## Quick Navigation
- [1. Development Environment Prerequisites](#1-development-environment-prerequisites)
- [2. Fork & Branch Workflow](#2-fork--branch-workflow)
- [3. Creating a New Blog Post](#3-creating-a-new-blog-post)
- [4. Frontmatter Specification](#4-frontmatter-specification)
- [5. Setting Up Authors & Shared Authorship](#5-setting-up-authors--shared-authorship)
  - [Single Author](#single-author)
  - [Shared Authorship (Multiple Co-Authors)](#shared-authorship-multiple-co-authors)
  - [Registering an Author Profile in `src/data/authors.ts`](#registering-an-author-profile-in-srcdataauthorsts)
  - [Guest / Unregistered Authors](#guest--unregistered-authors)
- [6. Images & Media](#6-images--media)
- [7. Local Testing & Verification](#7-local-testing--verification)
- [8. Pull Request Submission Checklist](#8-pull-request-submission-checklist)

---

## 1. Development Environment Prerequisites

Tekromancy uses **[Astro](https://astro.build/)** with **Node.js** and **pnpm**:

- **Node.js**: `v22.12.0` or higher (recommended: Node.js 24 or 26)
- **pnpm**: `v10` or higher (`pnpm@11.24.0` is used by the repository)

Install dependencies:
```bash
cd blog
pnpm install
```

---

## 2. Fork & Branch Workflow

1. **Fork** the repository on GitHub: `https://github.com/Tekromancy/tekromancy`
2. **Clone** your fork locally:
   ```bash
   git clone https://github.com/<your-username>/tekromancy.git
   cd tekromancy/blog
   ```
3. **Create a topic branch** off `main`:
   ```bash
   git checkout -b post/my-deep-dive-title
   ```

---

## 3. Creating a New Blog Post

All blog dispatches are stored as Markdown (`.md`) or MDX (`.mdx`) files in:
```
blog/src/content/blog/
```

Create a new file using a clean, URL-friendly kebab-case filename (which serves as the post's slug):
```bash
touch src/content/blog/my-deep-dive-title.md
```

---

## 4. Frontmatter Specification

Every article requires a YAML frontmatter block at the top of the file:

```yaml
---
title: "My Deep Dive Title: Understanding Low-Level Systems"
description: "A concise 1-2 sentence overview of what the reader will learn or explore in this dispatch."
pubDate: "2026-09-05"
updatedDate: "2026-09-06" # Optional: include if revised later
heroImage: "my-hero.png"   # Optional: filename in src/assets/blog/ or absolute path
tags: ["linux", "kernel", "ebpf"]
authors:
  - "Joshua Edward McLaughlin Cox"
  - "Jane Doe"
---

Your markdown content begins here...
```

### Frontmatter Fields

| Field | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `title` | `string` | **Yes** | The headline displayed in the article and social cards. |
| `description` | `string` | **Yes** | Summary shown on preview cards, RSS, and SEO meta tags. |
| `pubDate` | `string` (`YYYY-MM-DD`) | **Yes** | Date published. |
| `updatedDate` | `string` (`YYYY-MM-DD`) | *No* | Last updated date (if applicable). |
| `heroImage` | `string` | *No* | Filename of hero banner image located in `src/assets/blog/`. |
| `tags` | `string[]` | *No* | Array of tags (e.g. `linux`, `kubernetes`, `ai-ml`, `security`, `networking`, `devops`). |
| `author` | `string` | *No* | Legacy / single author name. Defaults to `"Joshua Edward McLaughlin Cox"`. |
| `authors` | `string[]` | *No* | Array of co-authors for shared authorship. Preferred for multi-author posts. |

---

## 5. Setting Up Authors & Shared Authorship

Tekromancy supports both **single-author** articles and **shared authorship** (multiple co-authors).

### Single Author
If you are the sole author, you can specify:
```yaml
author: "Your Name"
```
Or as a single-element list:
```yaml
authors:
  - "Your Name"
```

### Shared Authorship (Multiple Co-Authors)
When writing a collaborative dispatch or co-authoring research with others, specify the `authors` list:

```yaml
authors:
  - "Joshua Edward McLaughlin Cox"
  - "DeployCoop Core Team"
  - "Jane Doe"
```

**How Shared Authorship Renders:**
- **Header Metadata**: Formatted automatically as `by Author 1, Author 2 & Author 3` with clickable links to filtered dispatches.
- **Preview Cards**: Displays `by Author 1 & Author 2` on homepage dispatches and blog archive cards.
- **Article Footer**: Automatically renders a dedicated `// CO-AUTHORS & CONTRIBUTORS` section featuring bio cards, avatars/initials, and GitHub/social links for each author.
- **Schema.org JSON-LD**: Generates a compliant `BlogPosting` Schema with multiple `Person` author entities for search engine optimization.

### Registering an Author Profile in `src/data/authors.ts`

To display your full title, custom bio, and social links in the article's bio card, register your profile in `src/data/authors.ts`:

1. Open `src/data/authors.ts`.
2. Add your entry to the `AUTHORS` object:

```typescript
export const AUTHORS: Record<string, Author> = {
  // Existing authors...
  
  'jane-doe': {
    id: 'jane-doe',
    name: 'Jane Doe',
    role: 'Kernel & Distributed Systems Researcher',
    bio: 'Specializing in eBPF kernel instrumentation, XDP high-performance packet pipelines, and zero-trust mesh networks.',
    initials: 'JD',
    github: 'https://github.com/janedoe',
    twitter: 'https://twitter.com/janedoe',
    website: 'https://janedoe.dev',
  },
};
```

You can now use either `"Jane Doe"` or `"jane-doe"` in your markdown `authors` list!

### Guest / Unregistered Authors
If you don't register an author profile in `src/data/authors.ts`, **it still works automatically**:
- The site will dynamically synthesize an author profile using the name provided.
- Initials are automatically derived (e.g. `"Linus Torvalds"` -> `"LT"`).
- A clean fallback bio and profile card will be rendered.

---

## 6. Images & Media

If your post includes a hero banner or inline diagrams:
1. Place images in `src/assets/blog/` (e.g. `src/assets/blog/my-diagram.png`).
2. In frontmatter, set:
   ```yaml
   heroImage: "my-diagram.png"
   ```
3. For inline images inside the article:
   ```markdown
   ![Network Topology Diagram](../../assets/blog/my-diagram.png)
   ```
4. **Format & Sizing**: Prefer `.webp`, `.png`, or `.jpg`. Astro's image pipeline automatically optimizes and generates responsive `srcset` resolutions (`400w`, `800w`, `1200w`).

---

## 7. Local Testing & Verification

Before opening a PR, test your changes locally:

1. **Start the local development server**:
   ```bash
   pnpm dev
   ```
   Open `http://localhost:4321` in your browser and check:
   - Your post appears on `/blog` and on the homepage.
   - Author names and bio cards render cleanly.
   - Theme switching (`green`, `purple`, `blue`, `orange`, `aurora`, `obsidian`) looks sharp.

2. **Run TypeScript check & linter**:
   ```bash
   pnpm check
   ```

3. **Verify the static production build**:
   ```bash
   pnpm build
   ```
   Ensure the build completes with `0 errors` and generates all static HTML pages.

---

## 8. Pull Request Submission Checklist

When your post is ready, push your branch and open a PR against `main`:

```bash
git add src/content/blog/my-deep-dive-title.md
# If you registered an author profile:
git add src/data/authors.ts
# If you added images:
git add src/assets/blog/

git commit -m "feat(blog): add deep dive on <topic>"
git push origin post/my-deep-dive-title
```

### Checklist for Your PR Description:
- [ ] Post file is located in `src/content/blog/<slug>.md`.
- [ ] YAML frontmatter contains `title`, `description`, `pubDate`, `tags`, and `author`/`authors`.
- [ ] Multiple co-authors (if applicable) are specified via the `authors:` array.
- [ ] Any new author profiles added to `src/data/authors.ts` (optional, but encouraged).
- [ ] Code blocks specify appropriate language identifiers (e.g. ```` ```bash ````, ```` ```yaml ````, ```` ```rust ````).
- [ ] `pnpm build` passes locally with 0 errors.

Our automated GitHub Pages CI workflow will build and validate your pull request. Once reviewed by maintainers, it will be merged into `main` and automatically published to [tekromancy.com](https://tekromancy.com)!
