---
title: The Composite
description: Form a hierarchy of interstellar fleets acting as a single monolithic swarm.
type: apl
gofPattern: Composite
gofCategory: Structural
arcaneSchool: Transmutation // Swarm-Weaving
formula: |
  :Class FleetComponent
      ∇ R←PowerLevel
        :Access Public Shared
        R←0
      ∇
  :EndClass
  
  :Class Drone : FleetComponent
      ∇ R←PowerLevel
        :Access Public
        R←10 ⍝ Individual drone power ⍫
      ∇
  :EndClass
  
  :Class Squadron : FleetComponent
      :Field Private Units ← ⍬
      
      ∇ Add Unit
        :Access Public
        Units ← Units , Unit
      ∇
      
      ∇ R←PowerLevel
        :Access Public
        R ← +/ {⍵.PowerLevel} ¨ Units
      ∇
  :EndClass
tags: [apl, structural, alien, composite, swarm]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

To command an alien swarm is to treat the whole exactly as one treats the individual. The Composite pattern binds solitary Drones (`⍫`) and massive Squadrons into a unified array. Calculating the total power level of the swarm employs the ancient each (`¨`) and reduce (`+/`) glyphs, cascading through the multidimensional hierarchy to sum the collective psychic energy of the armada.
