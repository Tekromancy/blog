---
title: The Singleton
description: Ensuring only one Supreme Lich manages the central hospital database.
type: mumps
gofPattern: Singleton
gofCategory: Creational
arcaneSchool: "Abjuration // Soul-Locking"
formula: |2
  SINGLETON ; Singleton Pattern in MUMPS
  ; Managing access to the Supreme Lich.
  ;
  GETLICH() ;
    L +^SUPREMELICH:5 I '$T Q "LICH IS BUSY WITH ANOTHER NECROMANCER"
    I $D(^SUPREMELICH)=0 D
    . S ^SUPREMELICH="AWAKENED"
    . S ^SUPREMELICH("POWER")=9001
    . W "The Supreme Lich is summoned for the first time.",!
    L -^SUPREMELICH
    Q "SUPREME_LICH_REF"
tags: [creational, singleton, mumps, necromancy]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
