---
title: The Flyweight
description: Sharing immutable state via lazy evaluation and pure references.
type: haskell
gofPattern: Flyweight
gofCategory: Structural
arcaneSchool: Conjuration // Optimization
formula: |
  module Flyweight where
  data Particle = Particle { color :: String, texture :: String }
  sharedFireParticle = Particle "Red" "Fire"
  renderParticle x y p = "Render at " ++ show x ++ "," ++ show y
tags: [flyweight, lazy, optimization]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
