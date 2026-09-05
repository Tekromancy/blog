/**
 * Authors Registry & Utilities
 * 
 * Provides structured author profiles, resolver logic for post authors,
 * and formatting utilities for shared authorship.
 */

export interface Author {
  id: string;
  name: string;
  role?: string;
  bio?: string;
  avatar?: string;
  initials?: string;
  github?: string;
  twitter?: string;
  website?: string;
  email?: string;
}

/**
 * Known/registered authors on the site.
 * Guest authors or ad-hoc authors in frontmatter are automatically supported
 * via getAuthor() fallback.
 */
export const AUTHORS: Record<string, Author> = {
  'joshua-cox': {
    id: 'joshua-cox',
    name: 'Joshua Edward McLaughlin Cox',
    role: 'Technomancer & Systems Architect',
    bio: 'Passionate about low-level Linux systems engineering, high-scale Kubernetes deployments, local artificial intelligence pipelines, and defensive security. Building robust, sovereign computing environments that stand the test of time.',
    initials: 'JC',
    github: 'https://github.com/joshuacox',
    website: 'https://tekromancy.com',
  },
  'tekromancy-collective': {
    id: 'tekromancy-collective',
    name: 'Tekromancy Collective',
    role: 'Infrastructure & Security Guild',
    bio: 'Collaborative research dispatches authored jointly by the Tekromancy engineering guild, specializing in low-level systems, zero-trust topologies, and automated cloud infrastructure.',
    initials: 'TC',
    github: 'https://github.com/Tekromancy',
    website: 'https://tekromancy.com',
  },
  'deploycoop': {
    id: 'deploycoop',
    name: 'DeployCoop Core Team',
    role: 'GitOps & Distributed Systems Engineers',
    bio: 'Pioneering collaborative deployment automation, Kubernetes operator frameworks, and resilient multi-tenant orchestration.',
    initials: 'DC',
    github: 'https://github.com/DeployCoop',
  },
};

/**
 * Generate 1-2 letter initials from a display name
 */
export function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

/**
 * Normalize an identifier or name to an Author object.
 * If not found in AUTHORS registry, dynamically generates an Author profile.
 */
export function getAuthor(idOrName: string): Author {
  if (!idOrName || typeof idOrName !== 'string') {
    return AUTHORS['joshua-cox'];
  }

  const normalized = idOrName.trim().toLowerCase();

  // 1. Direct ID match
  if (AUTHORS[normalized]) {
    return AUTHORS[normalized];
  }

  // 2. Name match in registry
  const matchByName = Object.values(AUTHORS).find(
    (a) => a.name.toLowerCase() === normalized
  );
  if (matchByName) {
    return matchByName;
  }

  // 3. Fallback: Dynamically generate profile for ad-hoc or guest author
  return {
    id: normalized.replace(/[^a-z0-9]+/g, '-'),
    name: idOrName.trim(),
    role: 'Contributing Technomancer',
    bio: `Contributing author at Tekromancy exploring advanced infrastructure and systems engineering.`,
    initials: getInitials(idOrName),
  };
}

/**
 * Resolves an array of Author objects for a given post.
 * Supports both single `author` (backwards-compatible) and multiple `authors` array.
 */
export function getPostAuthors(postData?: {
  author?: string;
  authors?: string[];
}): Author[] {
  if (!postData) {
    return [AUTHORS['joshua-cox']];
  }

  if (Array.isArray(postData.authors) && postData.authors.length > 0) {
    return postData.authors.map(getAuthor);
  }

  if (postData.author) {
    return [getAuthor(postData.author)];
  }

  return [AUTHORS['joshua-cox']];
}

/**
 * Format an array of author names naturally for display:
 * - 1 author: "Joshua Edward McLaughlin Cox"
 * - 2 authors: "Joshua Edward McLaughlin Cox & Jane Doe"
 * - 3+ authors: "Author A, Author B & Author C"
 */
export function formatAuthorNames(authors: (Author | string)[]): string {
  const names = authors.map((a) => (typeof a === 'string' ? a : a.name));
  if (names.length === 0) return '';
  if (names.length === 1) return names[0];
  if (names.length === 2) return `${names[0]} & ${names[1]}`;
  return `${names.slice(0, -1).join(', ')} & ${names[names.length - 1]}`;
}

/**
 * Returns all registered authors on the site
 */
export function getAllAuthors(): Author[] {
  return Object.values(AUTHORS);
}
