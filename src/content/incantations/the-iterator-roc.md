---
title: The Iterator of Grimoires
description: Sequentially traversing through arcane pages utilizing Roc's list processing.
type: roc
gofPattern: Iterator
gofCategory: Behavioral
arcaneSchool: "Divination // Bibliomancy"
tags: [fast-functional-wards, roc, iterator, traversal]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
formula: |2
  interface GrimoireIterator
      exposes [Page, readGrimoire]
      imports []

  Page : { number : U64, spell : Str }

  # In Roc, iteration is typically handled via List.walk or List.map
  readGrimoire : List Page -> List Str
  readGrimoire = \pages ->
      List.map pages \page ->
          "Reading page ${Num.toStr page.number}: ${page.spell}"
---
