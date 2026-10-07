---
title: The Doppelganger Prototype
description: Create new entities by cloning an archetypical instance, bypassing costly rituals.
type: javascript
gofPattern: Prototype
gofCategory: Creational
arcaneSchool: "Illusion // Duplication"
formula: |2
  class Doppelganger {
    constructor(form, memory) {
      this.form = form;
      this.memory = memory;
    }
    clone() {
      // Deep copy if necessary, but shallow works for basic illusions
      return new Doppelganger(this.form, [...this.memory]);
    }
    manifest() {
      console.log(`Manifesting as ${this.form} with memories: ${this.memory}`);
    }
  }

  const original = new Doppelganger("Town Guard", ["Guard duty at gate", "Loves pastries"]);
  const clone = original.clone();
  clone.memory.push("Met a suspicious wizard");

  original.manifest();
  clone.manifest();
tags: [cloning, illusion, memory]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

## The Doppelganger Prototype

When summoning a completely new entity is too taxing on your mana reserves, take an existing template and duplicate it. The Prototype pattern is the core secret behind an army of illusions.
