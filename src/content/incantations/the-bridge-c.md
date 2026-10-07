---
title: The Primordial Bridge
description: Decoupling the elemental abstraction from the binding implementation.
type: c
gofPattern: Bridge
gofCategory: Structural
arcaneSchool: "Transmutation // Weaving"
formula: |2
  #include <stdio.h>
  #include <stdlib.h>

  // Implementor: The physical manifestation
  typedef struct Manifestation Manifestation;
  struct Manifestation {
      void (*ignite)(Manifestation* self);
  };

  // Concrete Implementors
  void physical_ignite(Manifestation* self) { printf("Burning physical matter.\n"); }
  void ethereal_ignite(Manifestation* self) { printf("Igniting soul essence.\n"); }

  // Abstraction: The elemental spell
  typedef struct {
      Manifestation* manifest;
      void (*cast)(void* self);
  } SpellAbstraction;

  void cast_fireball(void* self) {
      SpellAbstraction* spell = (SpellAbstraction*)self;
      printf("Casting Fireball: ");
      spell->manifest->ignite(spell->manifest);
  }

  int main() {
      Manifestation physical = { physical_ignite };
      Manifestation ethereal = { ethereal_ignite };

      SpellAbstraction spell1 = { &physical, cast_fireball };
      SpellAbstraction spell2 = { &ethereal, cast_fireball };

      spell1.cast(&spell1);
      spell2.cast(&spell2);

      return 0;
  }
tags: [c, structural, bridge, decoupling]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

Through the Primordial Bridge, the elemental abstraction (the Spell) is decoupled from the physical binding (the Manifestation). Both can evolve independently across epochs without catastrophic collision. In C, we compose structs with pointers to interface functions.
