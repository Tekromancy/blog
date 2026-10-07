---
title: The Observer
description: Bind cosmic sensors to a central singularity.
type: apl
gofPattern: Observer
gofCategory: Behavioral
arcaneSchool: Divination // Resonance-Binding
formula: |
  :Class Singularity
      :Field Private Observers ← ⍬
      :Field Private Mass ← 0
      
      ∇ Attach Obs
        :Access Public
        Observers ← Observers , Obs
      ∇
      
      ∇ SetMass M
        :Access Public
        Mass ← M
        Notify
      ∇
      
      ∇ Notify
        :Access Private
        {⍵.Update Mass} ¨ Observers
      ∇
  :EndClass
  
  :Class CosmicSensor
      :Field Private Designation
      
      ∇ Make D
        :Access Public
        :Implements Constructor
        Designation ← D
      ∇
      
      ∇ Update Mass
        :Access Public
        ⎕ ← Designation, ' detects Singularity mass shift to ', ⍕Mass, ' ⍟'
      ∇
  :EndClass
tags: [apl, behavioral, alien, observer, singularity]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

A shifting Singularity (`⍟`) ripples across multiple dimensions. Instead of forcing cosmic sensors to continually poll the void, the Observer pattern binds them directly to the anomaly. When the Singularity's mass changes, it iterates across all bound sensors (`{⍵.Update Mass} ¨ Observers`), instantly propagating the resonance shift to the furthest edges of the alien fleet.
