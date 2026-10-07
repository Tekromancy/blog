---
title: The State of the Feline Mood
description: Allowing an object to alter its behavior when its internal state changes.
type: lolcode
gofPattern: State
gofCategory: Behavioral
arcaneSchool: "Transmutation // Polymorphism"
formula: |2
  HAI 1.2
  CAN HAS STDIO?

  I HAS A CAT_MOOD ITZ "SLEEPY"

  HOW IZ I PET_CAT
    BOTH SAEM CAT_MOOD AN "SLEEPY", O RLY?
      YA RLY
        VISIBLE "CAT PURRS SOFTLY."
        CAT_MOOD R "PLAYFUL"
      NO WAI
        BOTH SAEM CAT_MOOD AN "PLAYFUL", O RLY?
          YA RLY
            VISIBLE "CAT BITES YOUR HAND. CRITICAL HIT."
            CAT_MOOD R "SLEEPY"
        OIC
    OIC
  IF U SAY SO

  VISIBLE "MOOD IS: " CAT_MOOD
  I IZ PET_CAT MKAY
  VISIBLE "MOOD IS NOW: " CAT_MOOD
  I IZ PET_CAT MKAY

  KTHXBYE
tags: [state, feline, cyber-runes]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The State rune morphs the intrinsic behavior of a cyber-feline dynamically. Petting it while in 'SLEEPY' mode yields a purr, but the very same input under 'PLAYFUL' mode triggers a critical cyber-bite.
