---
title: The Bridge
description: Decouple the alien propulsion abstract interface from its arcane physical manifestations.
type: apl
gofPattern: Bridge
gofCategory: Structural
arcaneSchool: Conjuration // Dimensional-Bridging
formula: |
  :Class PropulsionImp
      ∇ Engage
        :Access Public Shared
      ∇
  :EndClass
  
  :Class WarpDrive : PropulsionImp
      ∇ Engage
        :Access Public
        ⎕ ← 'Folding space... ⌿⍀'
      ∇
  :EndClass
  
  :Class HyperDrive : PropulsionImp
      ∇ Engage
        :Access Public
        ⎕ ← 'Piercing dimensions... ⍝⍨'
      ∇
  :EndClass
  
  :Class AlienVessel
      :Field Public Engine ← ⍬
      
      ∇ Make Prop
        :Access Public
        :Implements Constructor
        Engine ← Prop
      ∇
      
      ∇ Fly
        :Access Public
        Engine.Engage
      ∇
  :EndClass
tags: [apl, structural, alien, bridge, propulsion]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Bridge pattern divides the abstraction of a vessel's navigation system from the terrifying reality of its propulsion mechanics. Whether tearing through the fabric of space with a Warp Drive (`⌿⍀`) or slipping through alternate dimensions via a Hyper Drive (`⍝⍨`), the `AlienVessel` remains ignorant of the underlying horrors. The bridge ensures that new engines can be developed in the cosmic shipyards without altering the vessel's psychic controls.
