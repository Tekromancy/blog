/**
 * Cyber Events Registry & Data Models
 * 
 * Manages upcoming and ongoing community events, Capture The Flag (CTF) wargames,
 * technical conferences, and field operations.
 */

export interface CyberEvent {
  id: string;
  title: string;
  slug: string;
  subtitle?: string;
  organization: string;
  orgUrl: string;
  displayOrgUrl?: string;
  location: string;
  venue?: string;
  timeframe: string;
  dateStr?: string;
  season: string;
  year: number;
  status: 'upcoming' | 'active' | 'completed';
  statusLabel: string;
  type: 'ctf' | 'conference' | 'workshop' | 'hackathon' | 'meetup';
  typeLabel: string;
  description: string;
  highlights?: string[];
  tags: string[];
  relatedPostSlug?: string;
  relatedPostTitle?: string;
  primaryCta: {
    label: string;
    url: string;
    external?: boolean;
  };
  secondaryCta?: {
    label: string;
    url: string;
    external?: boolean;
  };
}

export const CYBER_EVENTS: CyberEvent[] = [
  {
    id: 'austin-cyber-alliance-meetup-sep-2026',
    title: 'Austin Cyber Alliance Meetup: The Crucible of Hackers & 3D CTF Briefing',
    slug: 'austin-cyber-alliance-meetup-crucible-of-hackers',
    subtitle: 'Tonight at ACC Rio Grande Campus: 3D presentation on the history of CTF wargames, Red/Blue teaming, and Fall 2026 CTF planning.',
    organization: 'Austin Cyber Alliance / AI Cyber Alliance',
    orgUrl: 'https://aicyberalliance.org',
    displayOrgUrl: 'aicyberalliance.org',
    location: 'Austin, TX',
    venue: 'Austin Community College · Rio Grande Campus (Center for Government and Civic Service, 1218 West Ave)',
    timeframe: 'Tonight · Sep 8, 2026 · 6:00–8:00 PM CDT',
    dateStr: '2026-09-08',
    season: 'Fall',
    year: 2026,
    status: 'active',
    statusLabel: 'TONIGHT // 6:00 PM CDT',
    type: 'meetup',
    typeLabel: 'IN-PERSON MEETUP',
    description:
      'Join the Austin Cyber Alliance tonight at ACC Rio Grande Campus for an interactive 3D technical briefing on the history of Capture The Flag competitions, adversary emulation doctrine, and an introduction to open-source cyber ranges, followed by planning for the Fall 2026 Austin CTF.',
    highlights: [
      'Interactive 3D impress.js Briefing: The Crucible of Hackers',
      'Location: ACC Rio Grande Campus, Center for Government & Civic Service, 1218 West Ave',
      'Adversarial Doctrine & Modern Cyber Ranges (CTFd, Google kctf, Caldera)',
      'Austin Fall 2026 CTF Wargames Planning & Community Intel',
    ],
    tags: ['meetup', 'austin-tx', 'acc', 'ctf', 'cyber-security', 'red-team'],
    relatedPostSlug: 'austin-cyber-alliance-meetup-crucible-of-hackers',
    relatedPostTitle: 'Tonight in Austin: The Crucible of Hackers Presentation',
    primaryCta: {
      label: 'View 3D Presentation ↗',
      url: 'https://tekromancy.github.io/impressctf/',
      external: true,
    },
    secondaryCta: {
      label: 'Read Meetup Dispatch →',
      url: '/blog/austin-cyber-alliance-meetup-crucible-of-hackers',
      external: false,
    },
  },
  {
    id: 'austin-ctf-fall-2026',
    title: 'Austin Cyber Combat & CTF Wargames — Fall 2026',
    slug: 'austin-cyber-combat-ctf-fall-2026',
    subtitle: 'Offensive exploitation, defensive hardening, and AI security wargames in Austin, Texas.',
    organization: 'Austin Cyber Alliance / AI Cyber Alliance',
    orgUrl: 'https://aicyberalliance.org',
    displayOrgUrl: 'aicyberalliance.org',
    location: 'Austin, TX',
    venue: 'Silicon Hills (In-Person & Remote Hybrid Ops)',
    timeframe: 'Fall 2026',
    season: 'Fall',
    year: 2026,
    status: 'upcoming',
    statusLabel: 'IMMINENT // FALL 2026',
    type: 'ctf',
    typeLabel: 'CTF WARGAMES',
    description:
      'Live adversarial cyber wargames, Red vs. Blue team simulation, AI model jailbreaking and defense auditing, binary exploitation, and kernel telemetry challenges hosted in the Silicon Hills of Austin, TX in association with the Austin Cyber Alliance.',
    highlights: [
      'Red vs. Blue Team Live Combat & Flag Captures',
      'AI Security, LLM Red-Teaming & Adversarial Prompt Auditing',
      'Linux Kernel Internals & eBPF Telemetry Exploitation',
      'Silicon Hills Cyber Defense Guild Briefings & Live Networking',
    ],
    tags: ['ctf', 'austin-tx', 'cyber-security', 'red-team', 'blue-team', 'ai-security'],
    relatedPostSlug: 'history-of-ctf-red-blue-teaming',
    relatedPostTitle: 'History of CTF & Red/Blue Teaming Field Guide',
    primaryCta: {
      label: 'Alliance Portal & Event Intel ↗',
      url: 'https://aicyberalliance.org',
      external: true,
    },
    secondaryCta: {
      label: 'Read CTF Field Manual →',
      url: '/blog/history-of-ctf-red-blue-teaming',
      external: false,
    },
  },
];

/**
 * Helper to retrieve only active or upcoming events
 */
export function getUpcomingEvents(): CyberEvent[] {
  return CYBER_EVENTS.filter((event) => event.status === 'upcoming' || event.status === 'active');
}
