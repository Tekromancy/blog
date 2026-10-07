---
title: The Decorator
description: Dynamically attaching new enchantments to existing magical constructs.
type: typescript
gofPattern: Decorator
gofCategory: Structural
arcaneSchool: "Enchantment // Modification"
formula: |2
  interface Weapon {
    strike(): string;
  }
  
  class CyberBlade implements Weapon {
    strike() { return "Slashing with monomolecular edge."; }
  }
  
  abstract class WeaponEnchantment implements Weapon {
    constructor(protected weapon: Weapon) {}
    abstract strike(): string;
  }
  
  class VenomRune extends WeaponEnchantment {
    strike() {
      return `${this.weapon.strike()} ..also inflicts digital venom!`;
    }
  }
tags: [structural, typescript, decorator]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Decorator pattern attaches additional responsibilities to an object dynamically. It provides a flexible alternative to subclassing for extending functionality—perfect for stacking endless auras, runes, and enchantments onto a baseline artifact without polluting the core class.
