---
title: "The Singleton"
description: "The one true global word, eternal and unchanging across the execution plane."
type: b
gofPattern: Singleton
gofCategory: Creational
arcaneSchool: "Abjuration // Sealing"
formula: |2
  /* The eternal 'ext' keyword anchors our memory in the world state */

  ext monolith;

  get_monolith() {
      if (monolith == 0) {
          /* Awakening the monolith for the first and only time */
          monolith = 'AWAK';
      }
      return monolith;
  }

  commune() {
      auto a, b;
      a = get_monolith();
      b = get_monolith();
      /* a and b point to the exact same primordial truth */
  }
tags: [b, design-pattern, precursor, bell-labs-magic, untyped]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
