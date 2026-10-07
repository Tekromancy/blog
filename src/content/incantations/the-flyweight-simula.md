---
title: The Flyweight Incantation in Simula
description: Sharing intrinsic state to summon legions without draining the mana pool.
type: simula
gofPattern: Flyweight
gofCategory: Structural
arcaneSchool: "Transmutation // Efficiency"
formula: |2
  Begin
      Class Flyweight;
      Begin
          Integer sharedEssence;
          Procedure Operation(extrinsicState); Integer extrinsicState;
          Begin
              ! Blend shared essence with extrinsic variables;
          End;
      End;
  End;
tags: [simula, gof, structural, efficiency]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---

When the simulation demands thousands of similar entities, memory is a precious resource. The Flyweight shares the intrinsic soul of the objects, passing the transient, extrinsic details only when the spell is cast.
