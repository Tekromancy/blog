---
title: The Factory Method Hex
description: Delegating the instantiation of magical entities to subclasses.
type: groovy
gofPattern: Factory Method
gofCategory: Creational
arcaneSchool: "Conjuration // Summoning"
formula: |2
  abstract class Summoner {
      abstract Familiar summonFamiliar()

      void manifest() {
          def familiar = summonFamiliar()
          println "Manifested: ${familiar.getType()}"
      }
  }

  interface Familiar { String getType() }

  class CyberSummoner extends Summoner {
      Familiar summonFamiliar() { 
          return { "Mecha-Raven" } as Familiar 
      }
  }

  class VoidSummoner extends Summoner {
      Familiar summonFamiliar() { 
          return { "Shadow-Hound" } as Familiar 
      }
  }

  new CyberSummoner().manifest()
  new VoidSummoner().manifest()
tags: [groovy, creational, factory-method, closures]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

# The Factory Method Hex

The Factory Method hex delegates the specifics of entity summoning to specialized sub-summoners. By combining this pattern with Groovy's dynamic interface coercion from closures, a mage can define exact instantiation rules with minimal ritual overhead.
