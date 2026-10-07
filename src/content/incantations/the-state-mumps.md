---
title: The State
description: Altering a monstrosity's behavior based on its current level of decay.
type: mumps
gofPattern: State
gofCategory: Behavioral
arcaneSchool: "Transmutation // Form-Shifting"
formula: |2
  STATE ; State Pattern in MUMPS
  ;
  ACTION(ID) ;
    N STATE
    S STATE=$G(^MONSTER(ID,"STATE"),"FRESH")
    I STATE="FRESH" D FRESHACT Q
    I STATE="DECAYING" D DECAYACT Q
    I STATE="DUST" D DUSTACT Q
    Q
  ;
  FRESHACT W "Monster attacks with terrifying speed!",! S ^MONSTER(ID,"STATE")="DECAYING" Q
  DECAYACT W "Monster shambles forward slowly.",! S ^MONSTER(ID,"STATE")="DUST" Q
  DUSTACT W "A pile of dust does nothing.",! Q
tags: [behavioral, state, mumps, necromancy]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
