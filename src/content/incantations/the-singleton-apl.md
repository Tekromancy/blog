---
title: The Singleton
description: Ensure only one supreme Overmind instance governs the collective.
type: apl
gofPattern: Singleton
gofCategory: Creational
arcaneSchool: "Enchantment // Hive-Mind"
formula: |2
  :Class Overmind
      :Field Private Shared Instance ← ⍬
      :Field Public Thoughts ← ''

      ∇ Make
        :Access Private
        :Implements Constructor
        Thoughts ← '⍙⍚⍛'
      ∇

      ∇ R←GetInstance
        :Access Public Shared
        :If 0=≢Instance
            Instance ← ⎕NEW Overmind
        :EndIf
        R ← Instance
      ∇
  :EndClass
tags: [apl, creational, alien, singleton, overmind]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Singleton pattern guarantees the existence of only one Overmind within the hive-matrix. Attempting to instantiate multiple Overminds would result in psychic resonance cascade and array corruption. By encapsulating the instantiation within `GetInstance` and obscuring the constructor, all nodes in the alien network share the exact same thought-glyphs (`⍙⍚⍛`), maintaining perfect cosmic synchronization.
