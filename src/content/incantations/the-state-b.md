---
title: "The State"
description: "Mutating the behavior of an ancient artifact as its internal word alters."
type: b
gofPattern: State
gofCategory: Behavioral
arcaneSchool: "Transmutation // Polymorph"
formula: |2
  /* The artifact's behavior changes depending on the pointer in its state word */
  ext current_state_func;

  state_dormant() {
      putchar('Z'); putchar('Z'); putchar('Z');
      current_state_func = state_awakened; /* Transition */
  }

  state_awakened() {
      putchar('W'); putchar('A'); putchar('K');
  }

  poke_artifact() {
      (current_state_func)();
  }

  ritual() {
      current_state_func = state_dormant;
      poke_artifact(); /* Prints ZZZ, switches to awake */
      poke_artifact(); /* Prints WAK */
  }
tags: [b, design-pattern, precursor, bell-labs-magic, untyped]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
