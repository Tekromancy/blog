import sharp from 'sharp';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { mkdir } from 'fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');
const outputDir = join(projectRoot, 'public/ads');

// 1. Square Logo (1:1, 1200x1200) for Google Ads
const squareLogoSvg = `
<svg width="1200" height="1200" viewBox="0 0 1200 1200" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg-grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#050a07" />
      <stop offset="50%" stop-color="#08140c" />
      <stop offset="100%" stop-color="#020403" />
    </linearGradient>

    <linearGradient id="neon-glow" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#22EE44" />
      <stop offset="50%" stop-color="#4ade80" />
      <stop offset="100%" stop-color="#38bdf8" />
    </linearGradient>

    <filter id="glow" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="16" result="blur" />
      <feMerge>
        <feMergeNode in="blur" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>

    <filter id="soft-glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="6" result="blur" />
      <feMerge>
        <feMergeNode in="blur" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>

    <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
      <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#163821" stroke-width="1.2" opacity="0.4" />
    </pattern>
  </defs>

  <!-- Background -->
  <rect width="1200" height="1200" fill="url(#bg-grad)" />
  <rect width="1200" height="1200" fill="url(#grid)" />

  <!-- Outer Cyber Border Frame -->
  <rect x="50" y="50" width="1100" height="1100" rx="36" fill="none" stroke="#1b4328" stroke-width="4" opacity="0.8" />
  
  <!-- Corner Tech Brackets -->
  <path d="M 50 160 L 50 50 L 160 50" fill="none" stroke="#22EE44" stroke-width="8" filter="url(#soft-glow)" />
  <path d="M 1040 50 L 1150 50 L 1150 160" fill="none" stroke="#38bdf8" stroke-width="8" filter="url(#soft-glow)" />
  <path d="M 50 1040 L 50 1150 L 160 1150" fill="none" stroke="#22EE44" stroke-width="8" filter="url(#soft-glow)" />
  <path d="M 1040 1150 L 1150 1150 L 1150 1040" fill="none" stroke="#38bdf8" stroke-width="8" filter="url(#soft-glow)" />

  <!-- Central Hexagonal Core Emblem -->
  <g transform="translate(600, 480)">
    <!-- Outer Hex -->
    <polygon points="0,-240 208,-120 208,120 0,240 -208,120 -208,-120" 
             fill="#09180e" stroke="#22EE44" stroke-width="10" filter="url(#glow)" />
             
    <!-- Inner Circuit Lines -->
    <polygon points="0,-200 173,-100 173,100 0,200 -173,100 -173,-100" 
             fill="#061009" stroke="#15803d" stroke-width="4" opacity="0.8" />

    <!-- Terminal Chevron Glyphs inside hex -->
    <path d="M -80,-60 L 0,0 L -80,60" stroke="#86efac" stroke-width="18" stroke-linecap="round" stroke-linejoin="round" fill="none" filter="url(#soft-glow)" />
    <line x1="20" y1="60" x2="90" y2="60" stroke="#38bdf8" stroke-width="18" stroke-linecap="round" filter="url(#soft-glow)" />
  </g>

  <!-- Wordmark Text -->
  <text x="600" y="860" font-family="'Space Grotesk', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" 
        font-weight="900" font-size="92" letter-spacing="8" fill="url(#neon-glow)" text-anchor="middle" filter="url(#glow)">
    TEKROMANCY
  </text>

  <!-- Subtitle Tagline -->
  <text x="600" y="940" font-family="'JetBrains Mono', monospace" 
        font-size="28" font-weight="700" letter-spacing="6" fill="#22EE44" text-anchor="middle">
    &gt; INFRASTRUCTURE &amp; CODE_
  </text>

  <!-- URL Tag -->
  <text x="600" y="1030" font-family="'JetBrains Mono', monospace" 
        font-size="24" font-weight="700" letter-spacing="3" fill="#64748b" text-anchor="middle">
    tekromancy.com
  </text>
</svg>
`;

// 2. Landscape Logo (4:1, 1200x300) for Google Ads
const landscapeLogoSvg = `
<svg width="1200" height="300" viewBox="0 0 1200 300" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg-grad-land" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#040805" />
      <stop offset="60%" stop-color="#061209" />
      <stop offset="100%" stop-color="#020503" />
    </linearGradient>

    <linearGradient id="text-grad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#22EE44" />
      <stop offset="50%" stop-color="#4ade80" />
      <stop offset="100%" stop-color="#38bdf8" />
    </linearGradient>

    <filter id="soft-glow-land" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="5" result="blur" />
      <feMerge>
        <feMergeNode in="blur" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>

    <pattern id="grid-land" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#163821" stroke-width="0.8" opacity="0.3" />
    </pattern>
  </defs>

  <!-- Background Plate -->
  <rect width="1200" height="300" fill="url(#bg-grad-land)" />
  <rect width="1200" height="300" fill="url(#grid-land)" />

  <!-- Cyber Chassis Border -->
  <rect x="20" y="20" width="1160" height="260" rx="16" fill="none" stroke="#163821" stroke-width="2" />
  <path d="M 20 60 L 20 20 L 60 20" stroke="#22EE44" stroke-width="4" fill="none" filter="url(#soft-glow-land)" />
  <path d="M 1140 20 L 1180 20 L 1180 60" stroke="#38bdf8" stroke-width="4" fill="none" filter="url(#soft-glow-land)" />
  <path d="M 20 240 L 20 280 L 60 280" stroke="#22EE44" stroke-width="4" fill="none" filter="url(#soft-glow-land)" />
  <path d="M 1140 280 L 1180 280 L 1180 240" stroke="#38bdf8" stroke-width="4" fill="none" filter="url(#soft-glow-land)" />

  <!-- Left Hexagon Core Icon -->
  <g transform="translate(130, 150)">
    <polygon points="0,-80 69,-40 69,40 0,80 -69,40 -69,-40" 
             fill="#09140c" stroke="#22c55e" stroke-width="4" filter="url(#soft-glow-land)" />
    <path d="M -26,-20 L 0,0 L -26,20" stroke="#86efac" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" fill="none" />
    <line x1="8" y1="20" x2="30" y2="20" stroke="#38bdf8" stroke-width="6" stroke-linecap="round" />
  </g>

  <!-- Main Wordmark -->
  <text x="250" y="165" font-family="'Space Grotesk', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" 
        font-weight="900" font-size="82" letter-spacing="6" fill="url(#text-grad)" filter="url(#soft-glow-land)">
    TEKROMANCY
  </text>

  <!-- Subtitle Tagline -->
  <text x="255" y="215" font-family="'JetBrains Mono', monospace" 
        font-size="20" font-weight="700" letter-spacing="4" fill="#22EE44">
    &gt; INFRASTRUCTURE, KUBERNETES &amp; LINUX KERNEL_
  </text>

  <!-- Right Pill -->
  <g transform="translate(1040, 130)">
    <rect x="0" y="0" width="80" height="36" rx="6" fill="#0c2314" stroke="#22c55e" stroke-width="1.5" />
    <text x="40" y="23" font-family="'JetBrains Mono', monospace" font-size="14" font-weight="800" fill="#4ade80" letter-spacing="2" text-anchor="middle">SYS</text>
  </g>
</svg>
`;

// 3. Landscape Marketing Image (1.91:1, 1200x628) for Google Responsive Display Ads
const displayBannerSvg = `
<svg width="1200" height="628" viewBox="0 0 1200 628" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg-banner" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#020603" />
      <stop offset="60%" stop-color="#041208" />
      <stop offset="100%" stop-color="#010302" />
    </linearGradient>

    <linearGradient id="accent-cyan" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#22EE44" />
      <stop offset="60%" stop-color="#38bdf8" />
      <stop offset="100%" stop-color="#818cf8" />
    </linearGradient>

    <filter id="glow-banner" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="8" result="blur" />
      <feMerge>
        <feMergeNode in="blur" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>

    <pattern id="grid-banner" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#163821" stroke-width="0.8" opacity="0.3" />
    </pattern>
  </defs>

  <!-- Background -->
  <rect width="1200" height="628" fill="url(#bg-banner)" />
  <rect width="1200" height="628" fill="url(#grid-banner)" />

  <!-- Outer Border -->
  <rect x="25" y="25" width="1150" height="578" rx="16" fill="none" stroke="#163821" stroke-width="2" />
  <path d="M 25 70 L 25 25 L 70 25" stroke="#22EE44" stroke-width="4" fill="none" />
  <path d="M 1130 25 L 1175 25 L 1175 70" stroke="#38bdf8" stroke-width="4" fill="none" />
  <path d="M 25 558 L 25 603 L 70 603" stroke="#22EE44" stroke-width="4" fill="none" />
  <path d="M 1130 603 L 1175 603 L 1175 558" stroke="#38bdf8" stroke-width="4" fill="none" />

  <!-- Top Badge -->
  <g transform="translate(70, 75)">
    <rect x="0" y="0" width="220" height="34" rx="6" fill="#0b2413" stroke="#22c55e" stroke-width="1.5" />
    <text x="110" y="22" font-family="'JetBrains Mono', monospace" font-size="13" font-weight="800" fill="#4ade80" letter-spacing="2" text-anchor="middle">&gt; SYSTEMS ARCHITECTURE</text>
  </g>

  <!-- Main Headline -->
  <text x="70" y="180" font-family="'Space Grotesk', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" 
        font-weight="900" font-size="64" letter-spacing="2" fill="#ffffff">
    Master Linux Internals &amp;
  </text>
  <text x="70" y="250" font-family="'Space Grotesk', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" 
        font-weight="900" font-size="64" letter-spacing="2" fill="url(#accent-cyan)" filter="url(#glow-banner)">
    High-Scale Kubernetes
  </text>

  <!-- Body Copy -->
  <text x="70" y="325" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" 
        font-weight="500" font-size="22" fill="#94a3b8">
    Deep dives into eBPF tracing, bare-metal clusters, local AI inference,
  </text>
  <text x="70" y="360" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" 
        font-weight="500" font-size="22" fill="#94a3b8">
    and zero-trust networking. Written by systems engineers, for systems engineers.
  </text>

  <!-- Topic Badges -->
  <g transform="translate(70, 420)">
    <rect x="0" y="0" width="130" height="36" rx="6" fill="#091d11" stroke="#22c55e" stroke-width="1.2" />
    <text x="65" y="23" font-family="'JetBrains Mono', monospace" font-size="13" font-weight="700" fill="#4ade80" text-anchor="middle">#eBPF</text>

    <rect x="145" y="0" width="160" height="36" rx="6" fill="#081e2b" stroke="#38bdf8" stroke-width="1.2" />
    <text x="225" y="23" font-family="'JetBrains Mono', monospace" font-size="13" font-weight="700" fill="#38bdf8" text-anchor="middle">#KUBERNETES</text>

    <rect x="320" y="0" width="170" height="36" rx="6" fill="#1d122e" stroke="#c084fc" stroke-width="1.2" />
    <text x="405" y="23" font-family="'JetBrains Mono', monospace" font-size="13" font-weight="700" fill="#c084fc" text-anchor="middle">#AI-INFERENCE</text>

    <rect x="505" y="0" width="150" height="36" rx="6" fill="#181e0c" stroke="#a3e635" stroke-width="1.2" />
    <text x="580" y="23" font-family="'JetBrains Mono', monospace" font-size="13" font-weight="700" fill="#a3e635" text-anchor="middle">#WIREGUARD</text>
  </g>

  <!-- CTA Button Visual -->
  <g transform="translate(70, 500)">
    <rect x="0" y="0" width="220" height="50" rx="8" fill="#22EE44" />
    <text x="110" y="32" font-family="'Space Grotesk', -apple-system, sans-serif" font-size="17" font-weight="800" fill="#000000" letter-spacing="1" text-anchor="middle">READ DISPATCHES &#8594;</text>
  </g>

  <!-- Brand Signature Right -->
  <g transform="translate(940, 520)">
    <text x="0" y="0" font-family="'Space Grotesk', -apple-system, sans-serif" font-weight="900" font-size="28" letter-spacing="3" fill="#ffffff">TEKROMANCY</text>
    <text x="0" y="22" font-family="'JetBrains Mono', monospace" font-size="13" font-weight="700" fill="#22EE44">tekromancy.com</text>
  </g>
</svg>
`;

async function generate() {
  await mkdir(outputDir, { recursive: true });
  console.log(`Generating Google Ads assets in ${outputDir}...`);

  // 1. Square Logo (1:1, 1200x1200)
  const squareLogoPath = join(outputDir, 'logo-square-1200x1200.png');
  await sharp(Buffer.from(squareLogoSvg))
    .png({ quality: 95 })
    .toFile(squareLogoPath);
  console.log(`Generated: ${squareLogoPath}`);

  // 2. Square Logo (512x512) for App/Favicon/Store Icon
  const icon512Path = join(outputDir, 'logo-icon-512x512.png');
  await sharp(Buffer.from(squareLogoSvg))
    .resize(512, 512)
    .png({ quality: 95 })
    .toFile(icon512Path);
  console.log(`Generated: ${icon512Path}`);

  // 3. Landscape Logo (4:1, 1200x300)
  const landscapeLogoPath = join(outputDir, 'logo-landscape-1200x300.png');
  await sharp(Buffer.from(landscapeLogoSvg))
    .png({ quality: 95 })
    .toFile(landscapeLogoPath);
  console.log(`Generated: ${landscapeLogoPath}`);

  // 4. Landscape Marketing Banner (1.91:1, 1200x628)
  const displayBannerPath = join(outputDir, 'ad-display-landscape-1200x628.png');
  await sharp(Buffer.from(displayBannerSvg))
    .png({ quality: 95 })
    .toFile(displayBannerPath);
  console.log(`Generated: ${displayBannerPath}`);

  // 5. Square Marketing Display (1:1, 1200x1200)
  const displaySquarePath = join(outputDir, 'ad-display-square-1200x1200.png');
  await sharp(Buffer.from(squareLogoSvg))
    .png({ quality: 95 })
    .toFile(displaySquarePath);
  console.log(`Generated: ${displaySquarePath}`);

  console.log('All Google Ads assets generated successfully!');
}

generate().catch((err) => {
  console.error('Error generating Google Ads assets:', err);
  process.exit(1);
});
