---
title: The Abstract Factory
description: A grimoire of creation, weaving distinct families of elemental artifacts through Strict Typed Glyphs.
type: typescript
gofPattern: Abstract Factory
gofCategory: Creational
arcaneSchool: "Conjuration // Artifice"
formula: |2
  interface SpellFocus {
    channel(): string;
  }
  interface WardArmor {
    defend(): string;
  }
  
  interface ArcaneForge {
    craftFocus(): SpellFocus;
    forgeWard(): WardArmor;
  }
  
  class NeonFocus implements SpellFocus {
    channel() { return "Channeling raw neon plasma..."; }
  }
  class NeonWard implements WardArmor {
    defend() { return "Deflecting blasts with hard-light neon plating."; }
  }
  
  class NeonForge implements ArcaneForge {
    craftFocus(): SpellFocus { return new NeonFocus(); }
    forgeWard(): WardArmor { return new NeonWard(); }
  }
tags: [creational, typescript, factory]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Abstract Factory establishes an interface for creating families of related or dependent arcane constructs without specifying their concrete classes. In a cyberpunk magical paradigm, you can seamlessly swap out entire lineages of equipment (e.g., Neon vs. Void) without altering the core casting loop.
