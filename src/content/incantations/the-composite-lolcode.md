---
title: The Composite of the Clowder
description: Treating individual feline runes and clusters of feline runes uniformly.
type: lolcode
gofPattern: Composite
gofCategory: Structural
arcaneSchool: "Enchantment // Aggregation"
formula: |2
  HAI 1.2
  CAN HAS STDIO?

  HOW IZ I EXECUTE_CLOWDER YR NODE
    BOTH SAEM NODE'Z IS_CLOWDER AN WIN, O RLY?
      YA RLY
        VISIBLE "EXECUTING CLOWDER: " NODE'Z NAME
        I IZ EXECUTE_CLOWDER YR NODE'Z CHILD1 MKAY
        I IZ EXECUTE_CLOWDER YR NODE'Z CHILD2 MKAY
      NO WAI
        VISIBLE "EXECUTING LONE CAT: " NODE'Z NAME
    OIC
  IF U SAY SO

  I HAS A CAT1 ITZ A BUKKIT
  CAT1 HAS A NAME ITZ "BYTE_CAT"
  CAT1 HAS A IS_CLOWDER ITZ FAIL

  I HAS A CAT2 ITZ A BUKKIT
  CAT2 HAS A NAME ITZ "NIBBLE_CAT"
  CAT2 HAS A IS_CLOWDER ITZ FAIL

  I HAS A BIG_CLOWDER ITZ A BUKKIT
  BIG_CLOWDER HAS A NAME ITZ "THE_GREAT_SWARM"
  BIG_CLOWDER HAS A IS_CLOWDER ITZ WIN
  BIG_CLOWDER HAS A CHILD1 ITZ CAT1
  BIG_CLOWDER HAS A CHILD2 ITZ CAT2

  I IZ EXECUTE_CLOWDER YR BIG_CLOWDER MKAY

  KTHXBYE
tags: [composite, feline, cyber-runes]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Composite spell orchestrates an entire clowder of feline runes just as easily as a lone cyber-cat, cascading commands through the tree of spectral constructs.
