---
title: The Familiar Factory Method
description: Define an interface for summoning familiars, but let subclasses decide which creature to conjure.
type: javascript
gofPattern: Factory Method
gofCategory: Creational
arcaneSchool: "Conjuration // Familiar Binding"
formula: |2
  class Familiar { act() {} }
  class Raven extends Familiar { act() { console.log('Scouting from above'); } }
  class Rat extends Familiar { act() { console.log('Sneaking through shadows'); } }

  class Summoner {
    summonFamiliar() { throw new Error('Must override'); }
    scout() {
      const familiar = this.summonFamiliar();
      familiar.act();
    }
  }

  class AerialSummoner extends Summoner {
    summonFamiliar() { return new Raven(); }
  }

  class UrbanSummoner extends Summoner {
    summonFamiliar() { return new Rat(); }
  }

  const summoner = new AerialSummoner();
  summoner.scout();
tags: [summoning, familiars, interface]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

## The Familiar Factory Method

Why hardcode your companion when the environment dictates the need? By deferring the exact instantiation to specialized summoners, you maintain flexibility in the arcane arts.
