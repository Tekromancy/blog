---
title: "The Prototype Incantation in Carbon"
description: "Clone complex magical objects from an existing prototype, bypassing expensive initialization rituals."
type: carbon
gofPattern: Prototype
gofCategory: Creational
arcaneSchool: "Transmutation // Cloning"
formula: |2
  package Prototype api;

  interface Cloneable {
    fn Clone[me: Self]() -> Self;
  }

  class CyberFamiliar {
    var name: String;
    var power_level: i32;

    impl as Cloneable {
      fn Clone[me: Self]() -> Self {
        return {.name = me.name, .power_level = me.power_level};
      }
    }
  }

  fn DuplicateFamiliar(original: CyberFamiliar) -> CyberFamiliar {
    return original.Clone();
  }
tags: [creational, carbon, copying]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

# The Prototype: Mirrors of the Successor

When initializing a cyber-familiar requires contacting remote daemon-servers and burning precious computational mana, creating one from scratch every time is a fool's errand. The Prototype pattern—the art of exact arcane duplication—bypasses initialization by copying the internal state of a master entity.

Carbon's strict but expressive type system makes deep cloning an explicit, safe operation. The old C++ copy constructors are replaced by deliberate `Clone` interfaces, ensuring no pointer alias traps snare the unwary adept.
