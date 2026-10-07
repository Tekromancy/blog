---
title: The Builder
description: Assemble unfathomable alien monoliths glyph by glyph.
type: apl
gofPattern: Builder
gofCategory: Creational
arcaneSchool: Transmutation // Monolith-Shaping
formula: |
  :Class MonolithBuilder
      :Field Private Structure ← ''
      
      ∇ AddBase
        :Access Public
        Structure ← Structure , '⍙'
      ∇
      
      ∇ AddCore
        :Access Public
        Structure ← Structure , '⍎⍕'
      ∇
      
      ∇ AddApex
        :Access Public
        Structure ← Structure , '⍋'
      ∇
      
      ∇ R←GetResult
        :Access Public
        R ← Structure
      ∇
  :EndClass
  
  :Class MonolithDirector
      ∇ R←Construct MBuilder
        :Access Public
        MBuilder.AddBase
        MBuilder.AddCore
        MBuilder.AddApex
        R ← MBuilder.GetResult
      ∇
  :EndClass
tags: [apl, creational, alien, builder, monolith]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Builder pattern separates the construction of a complex, multidimensional APL array from its representation. In the forgotten languages of the monolith builders, each stage of creation adds a specific geometric concept: `⍙` for the foundational matrix, `⍎⍕` for the shifting inner core, and `⍋` for the ascending apex. The Director orchestrates these structural mutations, yielding a perfectly formed alien artifact.
