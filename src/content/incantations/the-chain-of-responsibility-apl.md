---
title: The Chain of Responsibility
description: Pass anomalous energy spikes down a hierarchy of ancient obelisks.
type: apl
gofPattern: Chain of Responsibility
gofCategory: Behavioral
arcaneSchool: Evocation // Energy-Routing
formula: |
  :Class Node
      :Field Public NextNode ← ⍬
      
      ∇ Handle Flare
        :Access Public Shared
      ∇
  :EndClass
  
  :Class MinorObelisk : Node
      ∇ Handle Flare
        :Access Public
        :If Flare < 100
            ⎕ ← 'Minor Obelisk absorbed the flare ⍋'
        :ElseIf 0≠≢NextNode
            NextNode.Handle Flare
        :EndIf
      ∇
  :EndClass
  
  :Class MajorMonolith : Node
      ∇ Handle Flare
        :Access Public
        :If Flare < 1000
            ⎕ ← 'Major Monolith grounded the flare ⍒'
        :ElseIf 0≠≢NextNode
            NextNode.Handle Flare
        :EndIf
      ∇
  :EndClass
tags: [apl, behavioral, alien, chain-of-responsibility, nodes]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

When the star-winds howl with radioactive spikes, the alien network utilizes a Chain of Responsibility to safely ground the energy. A minor flare is absorbed by the first receiver (`⍋`). If the energy breaches their threshold, the signal delegates downward through the `NextNode` to massive monoliths (`⍒`). This decoupling prevents cascading array failures by ensuring the right artifact handles the right magnitude of chaos.
