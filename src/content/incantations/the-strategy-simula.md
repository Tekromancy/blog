---
title: The Strategy Incantation in Simula
description: Swappable algorithms bound within discrete artifacts of power.
type: simula
gofPattern: Strategy
gofCategory: Behavioral
arcaneSchool: "Evocation // Tactics"
formula: |2
  Begin
      Class Strategy;
      Virtual: Procedure Execute;
      Begin
      End;

      Class Context(strat); Ref(Strategy) strat;
      Begin
          Procedure PerformMagic;
          Begin
              strat.Execute;
          End;
      End;
  End;
tags: [simula, gof, behavioral, tactics]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

There is more than one way to flay a demon. Strategy extracts algorithms from their host, placing each in its own distinct grimoire. The caster can dynamically select which rite to employ at runtime.
