---
title: The Facade
description: Provide a unified, simplified interface to a set of complex, interconnected arcane subsystems.
type: unison
gofPattern: Facade
gofCategory: Structural
arcaneSchool: "Illusion // Masking"
formula: |2
  namespace Subsystems where
    ignite : Nat -> Text
    ignite n = "Fire ignited with power " ++ Nat.toText n
    
    channel : Text -> Text
    channel t = "Channeling " ++ t
    
    release : Text -> Text
    release t = t ++ " released!"
    
  -- The Facade
  castFireball : Nat -> Text
  castFireball power =
    fire = Subsystems.ignite power
    channeled = Subsystems.channel fire
    Subsystems.release channeled
tags: [structural, facade, unison, namespace]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

Arcane subsystems can be chaotic, filled with intricate components that require precise sequencing. The Facade pattern is realized in Unison simply by exposing a coarse-grained function that orchestrates the internal complexities of a given namespace. The uninitiated caster only interacts with the `castFireball` facade, blissfully unaware of the underlying `ignite`, `channel`, and `release` sub-spells.
