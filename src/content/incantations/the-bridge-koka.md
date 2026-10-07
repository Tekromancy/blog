---
title: The Bridge Constellation
description: Decouples an abstraction from its implementation so the two can vary independently, woven through effects.
type: koka
gofPattern: Bridge
gofCategory: Structural
arcaneSchool: "Transmutation // Weaving"
formula: |2
  effect catalyst
    fun ignite() : string
  
  effect spell
    fun cast-spell() : string
  
  fun wand-catalyst(action: () -> <catalyst|e> a) : e a
    with fun ignite() "Sparks fly from the wand"
    action()
  
  fun staff-catalyst(action: () -> <catalyst|e> a) : e a
    with fun ignite() "A torrent of energy erupts from the staff"
    action()
  
  fun fire-spell(action: () -> <spell,catalyst|e> a) : <catalyst|e> a
    with fun cast-spell() ignite() ++ ", forming a raging inferno!"
    action()
  
  pub fun main()
    with wand-catalyst
    with fire-spell
    println(cast-spell())
tags: [koka, bridge, structural]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
