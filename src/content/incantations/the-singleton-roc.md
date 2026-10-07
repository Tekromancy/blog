---
title: The Singleton of The Weave
description: Centralizing the magical leyline state using pure module-level constants.
type: roc
gofPattern: Singleton
gofCategory: Creational
arcaneSchool: "Divination // Leylines"
tags: [fast-functional-wards, roc, singleton, constant]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
formula: |2
  interface WeaveSingleton
      exposes [getTheWeave]
      imports []

  Weave : {
      leylineEnergy : U64,
      activeNodes : U64
  }

  # In a pure language, a Singleton is often just a global constant
  # or passed around explicitly as context.
  theWeave : Weave
  theWeave = {
      leylineEnergy: 999999,
      activeNodes: 12
  }

  getTheWeave : {} -> Weave
  getTheWeave = \_ -> theWeave
---
