---
title: The Flyweight Incantation
description: Conserving precious stack memory by sharing repetitive color states in Piet.
type: piet
gofPattern: Flyweight
gofCategory: Structural
arcaneSchool: "Conjuration // Chromatic Sorcery"
formula: |2
  // Piet flyweight representation:
  // - Intrinsic State: A master color block acting as a reference value.
  // - Extrinsic State: Transient stack values pushed right before utilizing the reference.
  // - Sharing: Redirecting multiple execution paths through the same master block.
  // - Efficiency: Reducing the total canvas size and codel count significantly.
tags: [structural, flyweight, piet]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---

In a medium where every pixel costs canvas space, the Flyweight is essential. It establishes centralized master blocks of color, routing diverse execution paths through them to reuse core values without duplicating the hefty structural footprint of the spell.
