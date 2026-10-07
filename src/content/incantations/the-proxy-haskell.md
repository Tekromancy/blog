---
title: The Proxy
description: Lazy thunks acting as arcane gateways to deferred computations.
type: haskell
gofPattern: Proxy
gofCategory: Structural
arcaneSchool: "Abjuration // Gateway"
formula: |2
  module Proxy where
  heavyComputation :: Int -> Int
  heavyComputation x = sum [1..100000] + x
  -- Lazy evaluation in Haskell is a built-in proxy!
  proxyVal = heavyComputation 10
tags: [proxy, laziness, structural]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
