---
title: "The Template Method"
description: "Defining the skeleton of an archaic spell, leaving steps to the acolytes."
type: b
gofPattern: Template Method
gofCategory: Behavioral
arcaneSchool: Necromancy // Animation
formula: |
  /* A ritual skeleton needing specific sub-steps provided via pointers */
  
  grand_ritual(prepare_fn, ignite_fn) {
      putchar('I'); putchar('N'); putchar('I'); putchar('T');
      prepare_fn();
      ignite_fn();
      putchar('E'); putchar('N'); putchar('D');
  }
  
  dark_prep() { putchar('D'); putchar('P'); }
  dark_ignite() { putchar('D'); putchar('I'); }
  
  light_prep() { putchar('L'); putchar('P'); }
  light_ignite() { putchar('L'); putchar('I'); }
  
  perform_magic() {
      grand_ritual(dark_prep, dark_ignite);
      grand_ritual(light_prep, light_ignite);
  }
tags: [b, design-pattern, precursor, bell-labs-magic, untyped]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
