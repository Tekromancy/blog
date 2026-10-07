---
title: The Flyweight of Cached Runes
description: Minimizing system calls by caching expensive computational states.
type: script
gofPattern: Flyweight
gofCategory: Structural
arcaneSchool: "Transmutation // Cachemancy"
formula: |2
  #!/usr/bin/env bash

  declare -A DNS_CACHE

  # Flyweight Factory / Accessor
  resolve_host() {
    local host=$1
    if [[ -z "${DNS_CACHE[$host]}" ]]; then
      echo "[Cache Miss] Resolving $host..."
      # Mock expensive resolution
      sleep 1
      DNS_CACHE[$host]="192.168.1.$((RANDOM % 255))"
    else
      echo "[Cache Hit] Using cached record for $host"
    fi

    echo "$host -> ${DNS_CACHE[$host]}"
  }

  # Client Code
  resolve_host "neon.local"
  resolve_host "matrix.local"
  resolve_host "neon.local" # Pulls from flyweight cache
tags: [bash, flyweight, structural, cache]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The overhead of invoking subshells and network calls can cripple a script. The Flyweight pattern in Bash is typically realized through associative arrays that memoize the results of expensive operations. When multiple threads request the same knowledge, the shared instance is served instantly.
