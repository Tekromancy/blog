---
title: The Visitor of the Vet Checkup
description: Representing an operation to be performed on the elements of an object structure.
type: lolcode
gofPattern: Visitor
gofCategory: Behavioral
arcaneSchool: "Abjuration // Inspection"
formula: |2
  HAI 1.2
  CAN HAS STDIO?

  HOW IZ I VET_VISITOR YR CAT_TYPE
    BOTH SAEM CAT_TYPE AN "KITTEN", O RLY?
      YA RLY
        VISIBLE "VET SAYS: KITTEN IS HEALTHY. GIVING VACCINE."
      NO WAI
        VISIBLE "VET SAYS: ELDER CAT IS CRANKY. PRESCRIBING REST."
    OIC
  IF U SAY SO

  I HAS A CAT_A ITZ "KITTEN"
  I HAS A CAT_B ITZ "ELDER"

  I IZ VET_VISITOR YR CAT_A MKAY
  I IZ VET_VISITOR YR CAT_B MKAY

  KTHXBYE
tags: [visitor, feline, cyber-runes]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---

The Visitor algorithm dispatches an external scanner—a digital Vet—across a structure of feline runes, applying distinct diagnostic spells depending on the exact class of the node it inspects.
