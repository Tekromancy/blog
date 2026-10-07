---
title: "The Adapter: Bridging the Arcane Protocols"
description: "Convert the interface of a class into another interface clients expect."
type: alloy
gofPattern: Adapter
gofCategory: Structural
arcaneSchool: "Transmutation // Interface-Morphing"
formula: |2
  sig MagicalInterface {
    castSpell: lone Effect
  }
  
  sig CyberSystem {
    executeHack: lone Effect
  }
  
  sig CyberMagicalAdapter extends MagicalInterface {
    system: one CyberSystem
  }
  {
    castSpell = system.executeHack
  }
  
  sig Effect {}
  
  pred execute_adapter[a: CyberMagicalAdapter] {
    some a.castSpell
  }
  
  run execute_adapter for 3
tags: [structural, adapter, protocols]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

# The Adapter: Bridging the Arcane Protocols

To make two disparate systems converse in the logic of Alloy, we define an Adapter signature. This sigil inherits from the target interface (`MagicalInterface`) but internally binds to the `CyberSystem`. Through declarative constraints (`castSpell = system.executeHack`), the translation becomes a fundamental truth of the universe.
