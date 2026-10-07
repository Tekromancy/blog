---
title: The Strategy
description: Swapping out algorithms for extracting life force dynamically at runtime.
type: mumps
gofPattern: Strategy
gofCategory: Behavioral
arcaneSchool: "Enchantment // Mind-Control"
formula: |2
  STRATEGY ; Strategy Pattern in MUMPS
  ;
  EXTRACT(PATIENT, METHOD) ;
    ; Using indirection to invoke the chosen strategy
    D @(METHOD_"(PATIENT)")
    Q
  ;
  DRAIN(P) W "Slowly draining life from ",P,! Q
  SIPHON(P) W "Rapidly siphoning soul energy from ",P,! Q
  CONSUME(P) W "Instantly consuming the essence of ",P,! Q
tags: [behavioral, strategy, mumps, necromancy]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
