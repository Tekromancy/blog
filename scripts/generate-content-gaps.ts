import fs from 'fs';
import path from 'path';

// In a real environment, this would use the @google-cloud/bigquery SDK
// For the context of this platform, we are simulating the telemetry pull
// representing the output of Query 5 from bigquery_queries.sql

const SIMULATED_ZERO_RESULT_QUERIES = [
  { search_term: 'ebpf firewall', frequency: 12 },
  { search_term: 'android root detection bypass', frequency: 8 },
  { search_term: 'kubernetes admission controllers', frequency: 5 }
];

const BLOG_CONTENT_DIR = path.join(process.cwd(), 'src/content/blog');

function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')       // Replace spaces with -
    .replace(/[^\w\-]+/g, '')   // Remove all non-word chars
    .replace(/\-\-+/g, '-');    // Replace multiple - with single -
}

async function run() {
  console.log('📡 Fetching Zero-Result search queries from BigQuery Telemetry...');
  
  if (!fs.existsSync(BLOG_CONTENT_DIR)) {
    fs.mkdirSync(BLOG_CONTENT_DIR, { recursive: true });
  }

  let draftsCreated = 0;

  for (const row of SIMULATED_ZERO_RESULT_QUERIES) {
    const slug = slugify(row.search_term);
    const filePath = path.join(BLOG_CONTENT_DIR, `auto-draft-${slug}.md`);

    // Check if a post with this slug (or auto-draft slug) already exists
    const finalPostExists = fs.existsSync(path.join(BLOG_CONTENT_DIR, `${slug}.md`));
    const draftExists = fs.existsSync(filePath);

    if (!finalPostExists && !draftExists) {
      const template = `---
title: "Understanding ${row.search_term.replace(/(^\w|\s\w)/g, m => m.toUpperCase())}"
description: "An in-depth look at ${row.search_term}, engineered based on high-frequency telemetry requests."
pubDate: "${new Date().toISOString().split('T')[0]}"
updatedDate: "${new Date().toISOString().split('T')[0]}"
heroImage: "1.jpg"
tags: ["engineering", "research"]
author: "Joshua Edward McLaughlin Cox"
draft: true
---

## Introduction

Telemetry indicates that users have searched for **"${row.search_term}"** ${row.frequency} times with zero results. 
This is an automatically generated draft scaffold to close the content gap.

## Implementation Details

[Draft your content here...]
`;
      fs.writeFileSync(filePath, template, 'utf-8');
      console.log(`✅ Scaffolded new draft: auto-draft-${slug}.md (Searched ${row.frequency} times)`);
      draftsCreated++;
    }
  }

  if (draftsCreated === 0) {
    console.log('⚡ All content gaps are currently addressed. No new drafts needed.');
  } else {
    console.log(`🎉 Automated Content Engine successfully scaffolded ${draftsCreated} new drafts!`);
  }
}

run().catch(console.error);
