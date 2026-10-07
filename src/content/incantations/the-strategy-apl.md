---
title: The Strategy
description: Deploy interchangeable algorithms for orbital bombardment.
type: apl
gofPattern: Strategy
gofCategory: Behavioral
arcaneSchool: Evocation // Tactics-Matrix
formula: |
  :Class BombardmentStrategy
      ∇ Execute Target
        :Access Public Shared
      ∇
  :EndClass
  
  :Class PrecisionStrike : BombardmentStrategy
      ∇ Execute Target
        :Access Public
        ⎕ ← 'Piercing shield of ', Target, ' with plasma beam ⍋'
      ∇
  :EndClass
  
  :Class CarpetBombing : BombardmentStrategy
      ∇ Execute Target
        :Access Public
        ⎕ ← 'Glassing the surface of ', Target, ' with dark matter ⍒'
      ∇
  :EndClass
  
  :Class Dreadnought
      :Field Private Tactic
      
      ∇ Make Strat
        :Access Public
        :Implements Constructor
        Tactic ← Strat
      ∇
      
      ∇ SetStrategy Strat
        :Access Public
        Tactic ← Strat
      ∇
      
      ∇ Assault Target
        :Access Public
        Tactic.Execute Target
      ∇
  :EndClass
tags: [apl, behavioral, alien, strategy, tactics]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The cosmic battlefield is chaotic, requiring a Dreadnought to shift its assault algorithms on the fly. The Strategy pattern encapsulates different modes of destruction into interchangeable modules. Whether carving a surgical strike through planetary shields (`⍋`) or unleashing a wave of dark matter to glass the surface (`⍒`), the Dreadnought simply invokes the active `BombardmentStrategy` without altering its internal logic.
