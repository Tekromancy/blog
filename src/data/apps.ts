/**
 * Tekromancy Sovereign Applications & Utilities Registry
 * 
 * Defines type contracts and metadata for native Android applications,
 * privacy utilities, and software clients published under the Tekromancy banner.
 */

export interface AppSpec {
  label: string;
  value: string;
}

export interface TekromancyApp {
  id: string;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  category: string;
  version: string;
  status: 'live' | 'beta' | 'preview';
  statusLabel: string;
  accentFrom: string;
  accentTo: string;
  glowColor: string;
  url: string;
  playStoreUrl?: string;
  betaGroup?: string;
  iconSymbol: string;
  highlights: string[];
  specs: AppSpec[];
  tags: string[];
}

export const TEKROMANCY_APPS: TekromancyApp[] = [
  {
    id: 'sparetank',
    name: 'SpareTank',
    shortName: 'SpareTank',
    tagline: 'Intelligent Battery Longevity & Emergency Power Guard',
    description: 'An intelligent Android battery longevity coach and emergency reserve manager. Prevents electrochemical cycle degradation through proactive 25%–75% charging alerts, and automatically preserves an untouched 15% spare tank for critical emergencies.',
    category: 'Battery Longevity • Power Management',
    version: 'v1.0',
    status: 'beta',
    statusLabel: 'CLOSED BETA',
    accentFrom: '#10b981',
    accentTo: '#06b6d4',
    glowColor: 'rgba(16, 185, 129, 0.35)',
    url: 'https://sparetank.tekromancy.com',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.tekromancy.sparetank',
    betaGroup: 'tekromancy@googlegroups.com',
    iconSymbol: '🔋',
    highlights: [
      '25%–75% cycle degradation prevention alerts',
      'Guaranteed 15% emergency reserve power buffer',
      'Electrochemical degradation and capacity retention telemetry',
      'Zero tracking, zero ads, zero background telemetry drain',
    ],
    specs: [
      { label: 'Platform', value: 'Android 10+' },
      { label: 'Telemetry', value: '100% On-Device / Zero Cloud' },
      { label: 'Package ID', value: 'com.tekromancy.sparetank' },
      { label: 'Architecture', value: 'Native Kotlin / Jetpack Compose' },
    ],
    tags: ['Android', 'Battery Health', 'On-Device', 'Power Guard', 'Privacy'],
  },
  {
    id: 'silent-mode-control',
    name: 'Silent Mode Control',
    shortName: 'SMC',
    tagline: 'Custom Android Call Screening & Granular Schedules',
    description: 'Take absolute control over when your smartphone rings or silences. Empowers users with granular ringer, vibration, and mute schedules for individual numbers and contact groups via the native Android Telecom framework. 100% on-device processing.',
    category: 'Telecom Screening • Notification Firewall',
    version: 'v1.0',
    status: 'beta',
    statusLabel: 'CLOSED BETA',
    accentFrom: '#9333ea',
    accentTo: '#6366f1',
    glowColor: 'rgba(147, 51, 234, 0.35)',
    url: 'https://smc.tekromancy.com',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.tekromancy.silentmodecontrol',
    iconSymbol: '🛡️',
    highlights: [
      'Native Android Telecom framework call screening',
      'Granular ringer and vibration schedules per contact & group',
      '24-hour visual scheduling timeline matrix',
      '100% on-device processing with zero data collection',
    ],
    specs: [
      { label: 'Platform', value: 'Android 11+' },
      { label: 'Call Engine', value: 'Android Telecom Screening Service' },
      { label: 'Package ID', value: 'com.tekromancy.silentmodecontrol' },
      { label: 'Privacy', value: 'Zero Cloud Sync / Zero Ad SDKs' },
    ],
    tags: ['Android', 'Call Screening', 'Firewall', 'Telecom', 'Zero Tracking'],
  },
];
