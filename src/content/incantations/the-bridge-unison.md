---
title: The Bridge
description: Decouple an arcane abstraction from its implementation, allowing both to vary independently.
type: unison
gofPattern: Bridge
gofCategory: Structural
arcaneSchool: "Illusion // Metamagic"
formula: |2
  structural type ElementalCore = Fire | Ice | Lightning
  
  structural type SpellForm = Bolt | Blast | Shield
  
  castSpell : SpellForm -> ElementalCore -> Text
  castSpell form core =
    c = match core with
      Fire -> "flaming"
      Ice -> "freezing"
      Lightning -> "sparking"
    f = match form with
      Bolt -> "bolt"
      Blast -> "blast"
      Shield -> "shield"
    c ++ " " ++ f
tags: [structural, bridge, unison, abstraction]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Bridge pattern in Unison leverages algebraic data types to cleanly separate orthogonal dimensions of a spell. Rather than defining a `FireBolt` or an `IceShield`, the magus defines `ElementalCore` and `SpellForm` independently. Functions then weave these separate lineages together, preventing an exponential explosion of spell variants within the namespace.
