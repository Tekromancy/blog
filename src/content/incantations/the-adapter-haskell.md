---
title: The Adapter
description: Typeclass instances adapting ancient planar energies into modern functional streams.
type: haskell
gofPattern: Adapter
gofCategory: Structural
arcaneSchool: "Transmutation // Geomancy"
formula: |2
  module Adapter where
  class ModernSpell s where invoke :: s -> String
  data AncientScroll = AncientScroll
  readScroll :: AncientScroll -> String
  readScroll _ = "Ancient Power"
  instance ModernSpell AncientScroll where invoke = readScroll
tags: [adapter, typeclasses, structural]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
