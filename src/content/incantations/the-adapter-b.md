---
title: "The Adapter"
description: "Bridging divergent archaic runes to speak a unified precursor tongue."
type: b
gofPattern: Adapter
gofCategory: Structural
arcaneSchool: "Transmutation // Alteration"
formula: |2
  /* Ancient rune from an forgotten library */
  ancient_strike(force) {
      putchar('S'); putchar('T'); putchar('R');
  }

  /* Modern precursor interface expects 'attack' */
  attack(power) {
      /* Adapter translates the conceptual invocation */
      ancient_strike(power * 2);
  }

  battle_sequence() {
      auto power;
      power = 10;
      /* The modern code calls attack, invoking the ancient one */
      attack(power);
  }
tags: [b, design-pattern, precursor, bell-labs-magic, untyped]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
