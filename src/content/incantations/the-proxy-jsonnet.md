---
title: The Proxy of Jsonnet
description: Controlling access or transforming data before output.
type: jsonnet
gofPattern: Proxy
gofCategory: Structural
arcaneSchool: "Abjuration // Guardian Ward"
formula: |2
  local RealConfig = {
    secret_key: "super-secret",
    public_key: "public-key"
  };

  local SafeProxy(config) = {
    public_key: config.public_key,
    secret_key: "REDACTED"
  };

  {
    exported_config: SafeProxy(RealConfig)
  }
tags: [structural, proxy, jsonnet]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
The Proxy pattern intercedes before configuration manifestation, perhaps masking secrets or verifying types, serving as a protective ward over the true data.
