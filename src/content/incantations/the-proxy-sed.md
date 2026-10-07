---
title: The Intercepting Illusion (Proxy)
description: Providing a surrogate or placeholder to control access to the main stream processing.
type: sed
gofPattern: Proxy
gofCategory: Structural
arcaneSchool: "Transmutation // Streamweaving"
formula: |2
  # Proxy: Intercepting execution based on an authorization line
  1 {
    /AUTH:SECRET/! {
      s/.*/Access Denied/
      p
      q
    }
    d
  }
  # If we got past line 1, we are authorized
  s/.*/[AUTHORIZED] &/
tags: [sed, structural, proxy]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
