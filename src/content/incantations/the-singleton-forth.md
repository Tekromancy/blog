---
title: Singleton (Forth)
description: The One True Artifact, residing in absolute memory.
type: forth
gofPattern: Singleton
gofCategory: Creational
arcaneSchool: "Enchantment // Relic-Binding"
formula: |2
  \ Relic-Binding: The Singleton
  \ Variables are inherent singletons in Forth.

  VARIABLE THE-MONOLITH

  : INITIATE-MONOLITH ( -- )
    THE-MONOLITH @ 0= IF
      999 THE-MONOLITH !
      ." The Monolith is awakened." CR
    ELSE
      ." The Monolith already exists!" CR
    THEN ;

  : READ-MONOLITH ( -- val )
    THE-MONOLITH @ ;

  \ Usage:
  \ INITIATE-MONOLITH
  \ INITIATE-MONOLITH
  \ READ-MONOLITH .
tags: [creational, singleton, forth, relics]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The simplest magic is often the most profound. Every `VARIABLE` in Forth provides a single memory address, making it a natural Singleton. Guarding its initialization ensures the dark relic is only sparked to life once.
