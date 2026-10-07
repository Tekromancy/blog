---
title: The Strategy of the Hunt
description: Defining a family of algorithms, encapsulating each one, and making them interchangeable.
type: lolcode
gofPattern: Strategy
gofCategory: Behavioral
arcaneSchool: "Evocation // Tactical-Swapping"
formula: |2
  HAI 1.2
  CAN HAS STDIO?

  HOW IZ I STEALTH_HUNT
    VISIBLE "SNEAKING QUIETLY THROUGH THE WIRES..."
  IF U SAY SO

  HOW IZ I BRUTE_HUNT
    VISIBLE "SMASHING EVERYTHING. MEOW!!"
  IF U SAY SO

  HOW IZ I EXECUTE_HUNT YR STRATEGY
    BOTH SAEM STRATEGY AN "STEALTH", O RLY?
      YA RLY
        I IZ STEALTH_HUNT MKAY
      NO WAI
        I IZ BRUTE_HUNT MKAY
    OIC
  IF U SAY SO

  I IZ EXECUTE_HUNT YR "STEALTH" MKAY
  I IZ EXECUTE_HUNT YR "BRUTE" MKAY

  KTHXBYE
tags: [strategy, feline, cyber-runes]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Strategy spell decouples the logic of the Hunt from the cyber-cat entity itself. Whether sneaking through fiber-optic cables or smashing through firewalls, the tactical algorithm can be swapped at runtime.
