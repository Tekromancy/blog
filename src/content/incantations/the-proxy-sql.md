---
title: The Proxy of the Spectral Guardian
description: Utilizing views and security policies to control access to the core matrices.
type: sql
gofPattern: Proxy
gofCategory: Structural
arcaneSchool: Abjuration // Access Warding
formula: |
  -- The True Table
  CREATE TABLE forbidden_archives (
      archive_id SERIAL PRIMARY KEY,
      secret_lore TEXT NOT NULL,
      clearance_level INT NOT NULL
  );

  -- Enable Row Level Security (The Proxy Mechanism)
  ALTER TABLE forbidden_archives ENABLE ROW LEVEL SECURITY;

  -- The Guardian Policy
  CREATE POLICY proxy_access_policy ON forbidden_archives
  FOR SELECT
  USING (
      clearance_level <= current_setting('mage.clearance_level')::INT
  );
tags: [rls, proxy, structural]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

# The Proxy of the Spectral Guardian

Direct access to the core matrices is a vulnerability. A mortal querying `forbidden_archives` might shatter their mind if exposed to higher-dimensional lore. The Proxy pattern intercept these raw requests.

In SQL, this is beautifully realized through **Row Level Security (RLS)**. The table itself acts as its own proxy, silently validating the current session's clearance level before deciding whether a row manifests in the result set or remains hidden in the void.
