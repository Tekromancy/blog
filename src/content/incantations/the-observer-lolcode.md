---
title: The Observer of the Food Bowl
description: Defining a one-to-many dependency so that when one object changes state, all its dependents are notified.
type: lolcode
gofPattern: Observer
gofCategory: Behavioral
arcaneSchool: "Divination // Event-Listening"
formula: |2
  HAI 1.2
  CAN HAS STDIO?

  HOW IZ I NOTIFY_CATS YR FOOD_LEVEL
    VISIBLE "FOOD BOWL LEVEL: " FOOD_LEVEL
    BOTH SAEM FOOD_LEVEL AN "FULL", O RLY?
      YA RLY
        VISIBLE "ALL CATS: MEOW! RUSHING TO BOWL!"
      NO WAI
        VISIBLE "ALL CATS: IGNORING."
    OIC
  IF U SAY SO

  VISIBLE "FILLING BOWL..."
  I IZ NOTIFY_CATS YR "FULL" MKAY

  KTHXBYE
tags: [observer, feline, cyber-runes]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Observer binds an array of spectral feline listeners to the legendary Food Bowl node. When the bowl signals a state change to FULL, an automated event storm awakens the slumbering swarm.
