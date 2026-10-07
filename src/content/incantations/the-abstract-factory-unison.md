---
title: The Abstract Factory
description: Conjure families of related content-addressed constructs without specifying their concrete structures.
type: unison
gofPattern: Abstract Factory
gofCategory: Creational
arcaneSchool: "Conjuration // Matter Creation"
formula: |2
  structural type Golem = Clay | Iron | Flesh
  structural type Wand = Oak | Willow | Bone
  
  structural type ArtificerFactory = {
    createGolem : () -> Golem,
    createWand : () -> Wand
  }
  
  necromancerFactory : ArtificerFactory
  necromancerFactory = ArtificerFactory ( _ -> Flesh ) ( _ -> Bone )
  
  geomancerFactory : ArtificerFactory
  geomancerFactory = ArtificerFactory ( _ -> Clay ) ( _ -> Oak )
  
  -- The content-addressed hash of the factory guarantees pure, consistent generation.
tags: [creational, factory, unison, content-addressed]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

In the Unison arcane weave, spells are addressed by their true hash, not their mortal names. The Abstract Factory ensures that when you conjure a suite of tools, they are strictly bound by the same hash lineage. By passing a factory record, the adept delegates the exact nature of the materialization to the higher arcane context.
