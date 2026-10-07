---
title: The Astral Bridge
description: Decouple an ethereal abstraction from its material implementation so the two can vary independently.
type: javascript
gofPattern: Bridge
gofCategory: Structural
arcaneSchool: "Conjuration // Planar Binding"
formula: |2
  class ElementalCore {
    channel() { throw new Error('Not implemented'); }
  }

  class FireCore extends ElementalCore {
    channel() { return "Flames of the Abyss"; }
  }

  class IceCore extends ElementalCore {
    channel() { return "Frost of the Void"; }
  }

  class Weapon {
    constructor(core) {
      this.core = core;
    }
    wield() { throw new Error('Not implemented'); }
  }

  class Sword extends Weapon {
    wield() {
      console.log(`Swinging a sword infused with ${this.core.channel()}`);
    }
  }

  const flamingSword = new Sword(new FireCore());
  flamingSword.wield();
tags: [bridge, decoupling, elements]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

## The Astral Bridge

A weapon's form and its elemental infusion are distinct aspects of its being. By bridging the shape (Weapon) with its essence (Core), you can recombine them infinitely without creating endless subclasses.
