---
title: The Ritual Template Method
description: Define the skeleton of a ritual in an operation, deferring some steps to subclasses.
type: javascript
gofPattern: Template Method
gofCategory: Behavioral
arcaneSchool: Necromancy // Ritual Crafting
formula: |
  class RitualSkeleton {
    performRitual() {
      this.prepareCircle();
      this.chant();
      this.manifest();
    }
    prepareCircle() { console.log("Drawing salt circle."); }
    chant() { throw new Error("Must implement chant"); }
    manifest() { console.log("The entity appears!"); }
  }
  
  class DemonSummoning extends RitualSkeleton {
    chant() { console.log("Chanting abyssal verses."); }
  }
  
  class SpiritSummoning extends RitualSkeleton {
    chant() { console.log("Singing ancestral songs."); }
  }
  
  const ritual = new DemonSummoning();
  ritual.performRitual();
tags: [templates, rituals, inheritance]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

## The Ritual Template Method

Every summoning ritual follows the same basic cadence: prepare, chant, and manifest. But the exact words vary. The Template Method cements the structure while leaving the specifics to specialized sub-rituals.
