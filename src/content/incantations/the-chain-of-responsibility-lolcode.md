---
title: The Chain of Responsibility of the Cyber-Elders
description: Passing requests along a chain of feline handlers.
type: lolcode
gofPattern: Chain of Responsibility
gofCategory: Behavioral
arcaneSchool: "Enchantment // Command-Routing"
formula: |2
  HAI 1.2
  CAN HAS STDIO?

  HOW IZ I ELDER_HANDLE YR MSG
    BOTH SAEM MSG AN "TREATS", O RLY?
      YA RLY
        VISIBLE "ELDER CAT ACCEPTS TREATS."
      NO WAI
        VISIBLE "ELDER CAT IGNORES. PASSING TO KITTEN."
        I IZ KITTEN_HANDLE YR MSG MKAY
    OIC
  IF U SAY SO

  HOW IZ I KITTEN_HANDLE YR MSG
    BOTH SAEM MSG AN "TOYS", O RLY?
      YA RLY
        VISIBLE "KITTEN PLAYS WITH TOYS."
      NO WAI
        VISIBLE "MESSAGE DROPPED IN THE LITTERBOX."
    OIC
  IF U SAY SO

  I IZ ELDER_HANDLE YR "TOYS" MKAY
  I IZ ELDER_HANDLE YR "BATH" MKAY

  KTHXBYE
tags: [chain-of-responsibility, feline, cyber-runes]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Chain of Responsibility threads a command through a hierarchy of cyber-felines. If an Elder Cat deems the request unworthy, it is cast downward until a Kitten processes it or it fades into the void.
