---
title: "The Facade"
description: "A simple interface hiding the chaotic abyss of primordial B structures."
type: b
gofPattern: Facade
gofCategory: Structural
arcaneSchool: Illusion // Glamour
formula: |
  /* The chaotic abyss */
  subsystem_init_mem(ptr) { /* Arcane setup */ }
  subsystem_align_stars() { /* Cosmological wait */ }
  subsystem_ignite(ptr) { /* Unleash energy */ }
  
  /* The Facade */
  simple_cast() {
      auto chaos_buffer[10];
      subsystem_init_mem(chaos_buffer);
      subsystem_align_stars();
      subsystem_ignite(chaos_buffer);
  }
  
  apprentice_turn() {
      /* The apprentice need not know the stars or the abyss */
      simple_cast();
  }
tags: [b, design-pattern, precursor, bell-labs-magic, untyped]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
