---
title: "The Memento"
description: "Capturing the internal state of a primordial rune to restore it post-calamity."
type: b
gofPattern: Memento
gofCategory: Behavioral
arcaneSchool: "Chronomancy // Restoration"
formula: |2
  /* The artifact whose memory alters over time */
  ext artifact_power;

  save_memento(mem_slot) {
      mem_slot[0] = artifact_power;
  }

  restore_memento(mem_slot) {
      artifact_power = mem_slot[0];
  }

  temporal_shift() {
      auto safe_state[1];

      artifact_power = 100;
      save_memento(safe_state);

      artifact_power = 0; /* Calamity strikes */

      restore_memento(safe_state); /* Order restored */
  }
tags: [b, design-pattern, precursor, bell-labs-magic, untyped]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
