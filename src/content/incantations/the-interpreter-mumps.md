---
title: The Interpreter
description: Parsing ancient runes to execute conditional resurrection logic.
type: mumps
gofPattern: Interpreter
gofCategory: Behavioral
arcaneSchool: "Divination // Rune-Reading"
formula: |2
  INTERPRETER ; Interpreter Pattern in MUMPS
  ;
  ; Runes: "RA" = Resurrect All, "K:" = Kill specific
  ;
  PARSE(RUNES) ;
    N I,CMD,ARG
    F I=1:1:$L(RUNES,"|") D
    . S CMD=$P($P(RUNES,"|",I),":",1)
    . S ARG=$P($P(RUNES,"|",I),":",2)
    . I CMD="RA" D RESALL
    . I CMD="K" D KILL(ARG)
    Q
  ;
  RESALL W "Resurrecting all patients in the ward!",! Q
  KILL(ID) W "Terminating patient ",ID,"'s life support.",! Q
tags: [behavioral, interpreter, mumps, necromancy]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---
