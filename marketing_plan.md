# Tekromancy Comprehensive Marketing & Google Ads Setup Plan

## 1. Executive Summary & Infrastructure

* **Brand**: Tekromancy (`https://tekromancy.com`)
* **Google Analytics 4 (GA4)**:
  * Property Name: `Tekromancy`
  * Property ID: `408486434`
  * Measurement ID: `G-YBFSBJRJK8`
  * Stream: Web Stream (`https://tekromancy.com`)
* **App ID**: `554699267`
* **Google AdSense Publisher ID**: `ca-pub-8973108060277483`
* **Target Audience**: SREs, DevOps Engineers, Linux Kernel Developers, Cloud Architects, Cybersecurity/CTF Practitioners, and AI/ML Infrastructure Specialists.

---

## 2. Completed Automated Implementation

The following technical components have already been implemented directly into the codebase:

1. **Google AdSense Core Script**:
   * Injected into `<head>` across all pages via [`src/layouts/Layout.astro`](file:///home/thoth/tekromancy/blog/src/layouts/Layout.astro#L147-L161).
   * Configured via `googleAdsenseClientId` in [`src/config/site.mjs`](file:///home/thoth/tekromancy/blog/src/config/site.mjs).
   * Includes `preconnect` and `dns-prefetch` to `https://pagead2.googlesyndication.com` for minimal Core Web Vitals impact.
2. **Authorized Seller File (`ads.txt`)**:
   * Published to [`public/ads.txt`](file:///home/thoth/tekromancy/blog/public/ads.txt) with:
     ```text
     google.com, pub-8973108060277483, DIRECT, f08c47fec0942fa0
     ```
   * Verified in production build output (`/ads.txt`).
3. **Google Ads Asset Library**:
   * Generated high-resolution compliant logos and display images in [`public/ads/`](file:///home/thoth/tekromancy/blog/public/ads/):
     * `logo-square-1200x1200.png` (1:1 Square Logo for Responsive Display & App campaigns)
     * `logo-icon-512x512.png` (1:1 High-Res App Icon)
     * `logo-landscape-1200x300.png` (4:1 Landscape Header Logo)
     * `ad-display-landscape-1200x628.png` (1.91:1 Landscape Marketing Image)
     * `ad-display-square-1200x1200.png` (1:1 Square Marketing Banner)
   * Automated reproduction script: `pnpm run generate-ad-assets`.
4. **Google Analytics 4 & Astro View Transitions**:
   * Global `gtag.js` loaded in [`src/layouts/Layout.astro`](file:///home/thoth/tekromancy/blog/src/layouts/Layout.astro).
   * Listens to `astro:after-swap` events so client-side SPA navigations automatically trigger page views in GA4 Property `408486434`.

---

## 3. Creative Matrix: Headlines, Descriptions & Extensions

Use this copy library when creating your Search, Display, and Demand Gen ads in Google Ads. All copy strictly obeys Google Ads character limits.

### Business Name (Max 25 characters)
```text
Tekromancy
```

### Short Headlines (Max 30 characters each)
*For Search & Responsive Display Ads (provide at least 5-10)*:
1. `Master Linux Internals` (22 chars)
2. `Sovereign Kubernetes` (20 chars)
3. `eBPF & bpftrace Guides` (23 chars)
4. `Zero-Trust WireGuard Mesh` (25 chars)
5. `Bare-Metal Cloud Guide` (22 chars)
6. `vLLM vs SGLang Benchmarks` (25 chars)
7. `Linux Kernel Performance` (24 chars)
8. `Production GitOps & K8s` (23 chars)
9. `Advanced Linux Hardening` (24 chars)
10. `Real-Time Kernel Tracing` (24 chars)
11. `Talos Linux & Cilium` (20 chars)
12. `Self-Hosted Headscale` (21 chars)
13. `Rook-Ceph NVMe Clusters` (23 chars)
14. `No Cloud Tax Kubernetes` (23 chars)
15. `CTF & Red Team Labs` (19 chars)

### Long Headlines (Max 90 characters each)
*For Responsive Display and Demand Gen Ads*:
1. `Deep Dives into Linux Kernel Internals, eBPF Tracing, and Sovereign Kubernetes.` (81 chars)
2. `Ditch the Cloud Tax: Production Bare-Metal Kubernetes with Talos, Cilium, and Ceph.` (83 chars)
3. `The Production bpftrace Playbook: Real-Time Kernel Performance Troubleshooting.` (79 chars)
4. `Sovereign High-Scale Infrastructure: Zero-Trust WireGuard, BGP, and Local AI Inference.` (88 chars)
5. `Engineering Dispatches on Kernel Architecture, Container Memory, and Cloud Sovereignty.` (88 chars)

### Descriptions (Max 90 characters each)
1. `Zero fluff. Reproducible architectures, benchmarks, and production configs for engineers.` (90 chars)
2. `Explore deep dives on eBPF, bare-metal Talos Linux, Cilium BGP, and local vLLM serving.` (87 chars)
3. `Learn how to diagnose Linux kernel latency, packet drops, and container OOM crashes live.` (89 chars)
4. `Build sovereign, high-throughput cloud infrastructure without paying public cloud markups.` (90 chars)
5. `Written by systems architects for SREs, kernel hackers, and cloud engineers. Read now.` (87 chars)

### Call to Action (CTA)
```text
Learn More (or "Read Now")
```

---

### Sitelink Extensions (Boosts Ad Rank & Click-Through Rate)

#### Sitelink 1: Bare-Metal Kubernetes
* **Link Text**: `Bare-Metal K8s Guide` (20 chars)
* **Line 1**: `Ditch EKS and GKE Cloud Tax` (27 chars)
* **Line 2**: `Talos Linux, Cilium, Rook-Ceph` (30 chars)
* **Final URL**: `https://tekromancy.com/blog/bare-metal-kubernetes-talos-cilium-rook-ceph`

#### Sitelink 2: bpftrace Playbook
* **Link Text**: `bpftrace Cheat Sheet` (20 chars)
* **Line 1**: `Diagnose Linux Kernel Latency` (29 chars)
* **Line 2**: `CPU, Block I/O, & Network Drops` (31 chars)
* **Final URL**: `https://tekromancy.com/blog/bpftrace-linux-kernel-performance-cheatsheet`

#### Sitelink 3: Sovereign WireGuard Mesh
* **Link Text**: `Private WireGuard Mesh` (22 chars)
* **Line 1**: `Self-Hosted Headscale & OIDC` (28 chars)
* **Line 2**: `Private DERP Relay Server` (25 chars)
* **Final URL**: `https://tekromancy.com/blog/headscale-wireguard-oidc-sovereign-mesh`

#### Sitelink 4: Local AI Inference
* **Link Text**: `vLLM vs SGLang Benchmark` (24 chars)
* **Line 1**: `Local LLM Serving Performance` (29 chars)
* **Line 2**: `Throughput, VRAM, & Quantization` (32 chars)
* **Final URL**: `https://tekromancy.com/blog/vllm-vs-sglang-tensorrt-llm-benchmark`

---

### Callout Extensions (Bullet highlights below ad)
* `Zero-Fluff Engineering` (22 chars)
* `Reproducible Blueprints` (23 chars)
* `Kernel eBPF One-Liners` (22 chars)
* `Sovereign Infrastructure` (24 chars)
* `Production Architecture` (23 chars)
* `No Sponsored Fluff` (18 chars)

---

## 4. Step-by-Step Manual Setup Guide

Below are the exact steps you must complete inside your Google accounts.

### Step 1: Link Google Ads with Google Analytics 4 (GA4)

1. Open **[Google Analytics](https://analytics.google.com/)** and select property **Tekromancy (`408486434`)**.
2. Click **Admin** (gear icon in the lower-left corner).
3. Under **Product Links**, click **Google Ads Links**.
4. Click the blue **Link** button in the upper right.
5. Choose your Google Ads Account ID.
6. Enable **Enable Personalized Advertising** and verify that **Enable Auto-Tagging** is toggled ON.
7. Click **Submit**.

#### Import GA4 Key Events into Google Ads:
1. In Google Ads, navigate to **Goals** > **Conversions** > **Summary**.
2. Click **New Conversion Action** > **Import**.
3. Select **Google Analytics 4 properties** > **Web**.
4. Import:
   * `page_view` (set as secondary/observation)
   * `scroll` (90% depth)
   * `click` (Outbound clicks / GitHub repo stars)
   * Form submission / Contact transmission (Primary conversion action)

---

### Step 2: Verify Google AdSense

1. Open **[Google AdSense](https://www.google.com/adsense/)** with Publisher ID `ca-pub-8973108060277483`.
2. Go to **Sites** > Click **Add site** > Enter `tekromancy.com`.
3. Check the verification method:
   * **ads.txt**: Already deployed at `https://tekromancy.com/ads.txt`.
   * **AdSense code snippet**: Already deployed in `<head>` across all pages via `Layout.astro`.
4. Click **Verify** / **Request Review**.
5. Once approved:
   * Under **By site** > Click the edit pencil next to `tekromancy.com`.
   * Enable **Auto ads** (or customize ad formats: Anchor ads, Side rails, In-article ads).
   * Exclude administrative or sensitive URLs if necessary.

---

### Step 3: Configure Google Ads Campaign #1 (High-Intent Technical Search)

This campaign captures engineers actively searching for solutions to production problems.

1. In Google Ads, click **+ Create** > **Campaign**.
2. **Objective**: *Create a campaign without a goal's guidance* > Select **Search**.
3. **Campaign Name**: `Search - Linux & Kubernetes Internals - US/Global`
4. **Networks**:
   * Deselect *Google Search Partners* and *Display Network* (stick strictly to core Google Search for highest lead quality).
5. **Locations**:
   * Target: United States, Canada, United Kingdom, Germany, Netherlands, Sweden, Australia (high concentration of cloud/SRE engineers).
6. **Languages**: English.
7. **Bidding Strategy**:
   * Start with **Maximize Clicks** with a **Maximum CPC Bid Limit** of `$0.65` to prevent overspending while gathering search query data.
8. **Keywords (Grouped by Intent)**:

```text
# Ad Group 1: eBPF & Kernel Performance
"ebpf tutorial"
"bpftrace cheatsheet"
"linux kernel tracing"
"debug slow disk io linux"
"trace process execution linux"
"ebpf vs kernel module"

# Ad Group 2: Bare Metal Kubernetes
"bare metal kubernetes"
"talos linux tutorial"
"talos cilium rook ceph"
"bare metal k8s vs eks"
"cilium bgp peering kubernetes"

# Ad Group 3: Sovereign Mesh & WireGuard
"self hosted headscale"
"headscale keycloak oidc"
"private derp server tailscale"
"wireguard bgp mesh linux"

# Ad Group 4: Local AI Inference
"vllm vs sglang benchmark"
"local llm inference throughput"
"radixattention prefix caching"
"serve llama 3 on premises"
```

9. **Negative Keywords (Add to Campaign to Block Junk Traffic)**:
   ```text
   -free
   -jobs
   -salary
   -internship
   -resume
   -certification
   -exam dumps
   -course download
   -torrent
   -crack
   -windows 10
   -windows 11
   ```

10. Input the **Headlines, Descriptions, and Sitelinks** from Section 3 above.

---

### Step 4: Configure Google Ads Campaign #2 (Responsive Display & Remarketing)

This campaign retargets previous visitors and builds awareness across developer blogs, StackOverflow, and GitHub.

1. In Google Ads, click **+ Create** > **Campaign** > **Display**.
2. **Campaign Name**: `Display - Developer Retargeting & Affinity`
3. **Budget**: `$3.00 - $5.00 / day`.
4. **Bidding**: *Maximize Conversions* (or *Viewable CPM*).
5. **Assets to Upload**:
   * Upload all 5 generated images from `blog/public/ads/`:
     * Square Logo (1:1): `logo-square-1200x1200.png`
     * Landscape Logo (4:1): `logo-landscape-1200x300.png`
     * Marketing Image (1.91:1): `ad-display-landscape-1200x628.png`
     * Marketing Image (1:1): `ad-display-square-1200x1200.png`
6. **Audience Targeting**:
   * **Remarketing**: Segment from GA4 Property `408486434` (Visitors who viewed any `/blog/*` page in the last 60 days).
   * **Custom Segments** (Target people who search for these terms on Google):
     * `kubernetes bare metal architecture`
     * `ebpf kernel programming`
     * `vllm multi gpu serving`
     * `talos linux production`
   * **Placements (Optional Exclusions)**: Exclude mobile app categories (games, kids apps) to prevent accidental click wastage.

---

### Step 5: Setup for App Promotion (App ID: 554699267)

If you are promoting an app corresponding to ID `554699267`:

1. In Google Ads, click **+ Create** > **Campaign** > **App**.
2. **Campaign Subtype**:
   * **App Installs** (to drive new installs) OR
   * **App Engagement** (to bring users back to technical dispatches).
3. Search for App ID **`554699267`** in the Google Play Store or Apple App Store dropdown.
4. Set daily target budget and target Cost Per Install (tCPI, e.g., `$1.20 - $2.50`).
5. Upload:
   * App icon: `public/ads/logo-icon-512x512.png`
   * Landscape Banner: `public/ads/ad-display-landscape-1200x628.png`
   * Headlines and Descriptions from Section 3.

---

## 5. Budget Allocation & ROI Milestones

| Campaign Tier | Daily Budget | Monthly Estimate | Target Objective | Expected Metrics |
| :--- | :--- | :--- | :--- | :--- |
| **Search Intent** | $7.00 / day | ~$210 / month | High-Intent Engineers | 350-500 targeted clicks (Avg CPC ~$0.45-$0.60) |
| **Retargeting Display** | $3.00 / day | ~$90 / month | Retention & Newsletter | 40,000+ impressions, 200+ returning readers |
| **AdSense Revenue** | Inbound | Monetizes incoming traffic | Ad display on long-form articles | CPMs in developer/DevOps niche average $6.00 - $18.00 |

### 30-Day Optimization Protocol
* **Day 7**: Review Search Terms report in Google Ads. Add any irrelevant queries as negative keywords.
* **Day 14**: Check Google AdSense dashboard. Verify that Auto ads or in-article units are not obstructing code blocks or navigation on mobile devices.
* **Day 30**: Evaluate top-performing articles in GA4 Property `408486434`. Shift 70% of ad spend toward the 2 articles with the lowest bounce rates and highest time-on-page.
