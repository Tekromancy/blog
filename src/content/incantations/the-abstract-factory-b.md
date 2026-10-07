---
title: "The Abstract Factory"
description: "Forging the precursor runes to spawn ancient objects through typeless invocation."
type: b
gofPattern: Abstract Factory
gofCategory: Creational
arcaneSchool: "Conjuration // Artifice"
formula: |2
  /* The primordial essence knows no types, only vectors and addresses */

  rune_a_forge() {
      auto mem[2];
      mem[0] = 'R'; mem[1] = 'A';
      return mem;
  }

  rune_b_forge() {
      auto mem[2];
      mem[0] = 'R'; mem[1] = 'B';
      return mem;
  }

  /* The Abstract Factory is merely an array of forge pointers */
  ext factory[2];

  init_factory() {
      factory[0] = rune_a_forge;
      factory[1] = rune_b_forge;
  }

  spawn_rune(type) {
      /* Dynamic dispatch across the void */
      return (factory[type])();
  }
tags: [b, design-pattern, precursor, bell-labs-magic, untyped]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
