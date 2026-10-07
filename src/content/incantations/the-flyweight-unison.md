---
title: The Flyweight
description: Minimize memory footprints by sharing as much data as possible with similar magical artifacts.
type: unison
gofPattern: Flyweight
gofCategory: Structural
arcaneSchool: "Conjuration // Efficiency"
formula: |2
  -- In Unison, all identical structures are automatically merged due to content-addressing.
  -- The Flyweight pattern is natively provided by the weave itself!
  
  structural type Particle = Particle Text
  
  fireMote : Particle
  fireMote = Particle "fire"
  
  -- Creating a million fire motes simply references the same content hash in the Unison node.
  summonSwarm : Nat -> [Particle]
  summonSwarm n = List.fill n fireMote
tags: [structural, flyweight, unison, content-addressed]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

The Flyweight pattern, an ancient technique for preserving the limited magical reserves (memory) of a wizard, is completely subsumed by Unison's fundamental laws. Because all values are content-addressed and immutable, two identical spells share the same exact essence in the void. You may conjure a swarm of a million fire motes, and the weave will only store the true form once.
