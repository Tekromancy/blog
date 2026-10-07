---
title: The Prototype of the Progenitor
description: Clone and modify ancient immutable grimoires.
type: sml
gofPattern: Prototype
gofCategory: Creational
arcaneSchool: "Illusion // Replicative Form"
formula: |2
  type grimoire = {
    title: string,
    spells: string list,
    manaCost: int
  }
  
  val standardGrimoire : grimoire = {
    title = "Apprentice's Guide",
    spells = ["Light", "Mage Hand"],
    manaCost = 10
  }
  
  fun cloneWithModifications (g: grimoire) newTitle newSpells : grimoire =
    {
      title = newTitle,
      spells = #spells g @ newSpells,
      manaCost = #manaCost g + 5
    }
  
  val advancedGrimoire = cloneWithModifications standardGrimoire "Adept's Guide" ["Fireball"]
tags: [immutability, records, cloning]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

When practicing the Prototype pattern in Standard ML, the ML Progenitor smiles upon immutability. You do not need deep or shallow copy semantics as seen in object-oriented realms; records are immutable. "Cloning" is fundamentally just creating a new record based on the values of the old one, applying any necessary augmentations along the way without corrupting the ancient original text.
