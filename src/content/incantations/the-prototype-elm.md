---
title: Prototype in Elm
description: Cloning and mutating immutable records in Elm using the Prototype pattern.
type: elm
gofPattern: Prototype
gofCategory: Creational
arcaneSchool: "Illusion // Cloning"
formula: |2
  module Prototype exposing (SpellRecord, baseSpell, fireBolt, iceLance)
  
  type alias SpellRecord =
      { element : String
      , damage : Int
      , manaCost : Int
      , isAoE : Bool
      }
  
  baseSpell : SpellRecord
  baseSpell =
      { element = "Arcane"
      , damage = 10
      , manaCost = 5
      , isAoE = False
      }
  
  fireBolt : SpellRecord
  fireBolt =
      { baseSpell | element = "Fire", damage = 25, manaCost = 15 }
  
  iceLance : SpellRecord
  iceLance =
      { baseSpell | element = "Ice", damage = 15, isAoE = True }
tags: [elm, creational, prototype, record-updates, immutability]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
# The Prototype: Reflections in the Immutable Mirror

True cloning is a fundamental law of the Elm universe. Because all data is immutable, the Prototype pattern is not an arcane ritual, but the very nature of existence. Using the record update syntax, an alchemist can spawn a flawless replica of a base construct, altering only the specific resonant frequencies needed for the new spell, leaving the original matrix untouched and pure.
