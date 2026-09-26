import sharp from "sharp";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, "..");
const outputPath = join(projectRoot, "public/og-image.png");

const svgCard = `
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Gradients -->
    <linearGradient id="bg-grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#040806" />
      <stop offset="60%" stop-color="#060f0a" />
      <stop offset="100%" stop-color="#020503" />
    </linearGradient>

    <linearGradient id="neon-grad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#22EE44" />
      <stop offset="50%" stop-color="#4ade80" />
      <stop offset="100%" stop-color="#38bdf8" />
    </linearGradient>

    <linearGradient id="accent-wire" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#22c55e" stop-opacity="0.1" />
      <stop offset="50%" stop-color="#4ade80" stop-opacity="0.8" />
      <stop offset="100%" stop-color="#38bdf8" stop-opacity="0.2" />
    </linearGradient>

    <!-- Filters -->
    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="8" result="blur" />
      <feMerge>
        <feMergeNode in="blur" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>

    <filter id="soft-glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="3" result="blur" />
      <feMerge>
        <feMergeNode in="blur" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>

    <!-- Grid Pattern -->
    <pattern id="cyber-grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#163821" stroke-width="0.7" opacity="0.35" />
    </pattern>
  </defs>

  <!-- Background -->
  <rect width="1200" height="630" fill="url(#bg-grad)" />
  <rect width="1200" height="630" fill="url(#cyber-grid)" />

  <!-- Outer Tech Border Frame -->
  <rect x="30" y="30" width="1140" height="570" rx="12" fill="none" stroke="#1b4328" stroke-width="1.5" opacity="0.7" />
  
  <!-- Corner Tech Accents -->
  <path d="M 30 70 L 30 30 L 70 30" fill="none" stroke="#22EE44" stroke-width="3" filter="url(#soft-glow)" />
  <path d="M 1130 30 L 1170 30 L 1170 70" fill="none" stroke="#38bdf8" stroke-width="3" filter="url(#soft-glow)" />
  <path d="M 30 560 L 30 600 L 70 600" fill="none" stroke="#22EE44" stroke-width="3" filter="url(#soft-glow)" />
  <path d="M 1130 600 L 1170 600 L 1170 560" fill="none" stroke="#38bdf8" stroke-width="3" filter="url(#soft-glow)" />

  <!-- Top Circuit Line -->
  <path d="M 70 30 L 250 30 L 270 45 L 700 45 L 720 30 L 1130 30" fill="none" stroke="url(#accent-wire)" stroke-width="2" />

  <!-- Hexagon Core Terminal Badge -->
  <g transform="translate(80, 100)">
    <polygon points="40,2 75,21 75,59 40,78 5,59 5,21" fill="#09180e" stroke="#22c55e" stroke-width="2.5" filter="url(#soft-glow)" />
    <path d="M 24,30 L 38,40 L 24,50" stroke="#86efac" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" fill="none" />
    <line x1="44" y1="50" x2="56" y2="50" stroke="#38bdf8" stroke-width="4" stroke-linecap="round" />
  </g>

  <!-- Main Brand Title -->
  <text x="180" y="160" font-family="'Space Grotesk', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="900" font-size="64" letter-spacing="4" fill="url(#neon-grad)" filter="url(#glow)">TEKROMANCY</text>

  <!-- Tagline / Mission Statement -->
  <text x="80" y="240" font-family="'JetBrains Mono', monospace" font-size="20" font-weight="700" letter-spacing="3" fill="#22EE44">&gt; INFRASTRUCTURE, LOW-LEVEL SYSTEMS &amp; SORCERY_</text>

  <!-- Main Description Paragraph -->
  <text x="80" y="320" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="500" font-size="28" fill="#e2e8f0">
    Deep dives into Linux internals, Kubernetes orchestration,
  </text>
  <text x="80" y="365" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="500" font-size="28" fill="#e2e8f0">
    AI/ML systems, distributed networking, and cybersecurity.
  </text>

  <!-- Tag Badges -->
  <g transform="translate(80, 435)">
    <!-- Badge 1: Linux & Kernel -->
    <rect x="0" y="0" width="160" height="38" rx="6" fill="#0c2314" stroke="#22c55e" stroke-width="1.5" />
    <text x="80" y="24" font-family="'JetBrains Mono', monospace" font-size="14" font-weight="700" fill="#4ade80" text-anchor="middle">#LINUX/KERNEL</text>

    <!-- Badge 2: Kubernetes -->
    <rect x="180" y="0" width="140" height="38" rx="6" fill="#081e2b" stroke="#38bdf8" stroke-width="1.5" />
    <text x="250" y="24" font-family="'JetBrains Mono', monospace" font-size="14" font-weight="700" fill="#38bdf8" text-anchor="middle">#KUBERNETES</text>

    <!-- Badge 3: eBPF -->
    <rect x="340" y="0" width="110" height="38" rx="6" fill="#181e0c" stroke="#a3e635" stroke-width="1.5" />
    <text x="395" y="24" font-family="'JetBrains Mono', monospace" font-size="14" font-weight="700" fill="#a3e635" text-anchor="middle">#EBPF</text>

    <!-- Badge 4: AI/ML Inference -->
    <rect x="470" y="0" width="140" height="38" rx="6" fill="#1d122e" stroke="#c084fc" stroke-width="1.5" />
    <text x="540" y="24" font-family="'JetBrains Mono', monospace" font-size="14" font-weight="700" fill="#c084fc" text-anchor="middle">#AI/ML-OPS</text>

    <!-- Badge 5: Security / CTF -->
    <rect x="630" y="0" width="160" height="38" rx="6" fill="#291212" stroke="#f87171" stroke-width="1.5" />
    <text x="710" y="24" font-family="'JetBrains Mono', monospace" font-size="14" font-weight="700" fill="#f87171" text-anchor="middle">#CYBERSECURITY</text>
  </g>

  <!-- Footer Telemetry Bar -->
  <path d="M 70 540 L 1130 540" fill="none" stroke="#163821" stroke-width="1.5" />
  
  <g transform="translate(80, 570)">
    <circle cx="6" cy="-4" r="5" fill="#22EE44" filter="url(#soft-glow)" />
    <text x="22" y="0" font-family="'JetBrains Mono', monospace" font-size="15" font-weight="700" fill="#94a3b8">SOVEREIGN COMPUTING &amp; HIGH-SCALE ARCHITECTURE</text>
  </g>

  <g transform="translate(980, 570)">
    <text x="0" y="0" font-family="'JetBrains Mono', monospace" font-size="17" font-weight="800" fill="#38bdf8" letter-spacing="1">tekromancy.com</text>
  </g>
</svg>
`;

async function generate() {
	console.log("Generating og-image.png from SVG template...");
	await sharp(Buffer.from(svgCard))
		.png({ quality: 90, compressionLevel: 8 })
		.toFile(outputPath);
	console.log(`Saved Open Graph image to ${outputPath}`);
}

generate().catch((err) => {
	console.error("Error generating og image:", err);
	process.exit(1);
});
