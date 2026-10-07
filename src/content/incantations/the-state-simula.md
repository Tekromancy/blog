---
title: The State Incantation in Simula
description: Altering an object's core behavior when its internal humours shift.
type: simula
gofPattern: State
gofCategory: Behavioral
arcaneSchool: "Transmutation // Metamorphosis"
formula: |2
  Begin
      Class State;
      Virtual: Procedure Handle(context); Ref(Context) context;
      Begin
      End;

      Class Context;
      Begin
          Ref(State) currentState;
          Procedure Request;
          Begin
              currentState.Handle(This Context);
          End;
      End;
  End;
tags: [simula, gof, behavioral, metamorphosis]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

An entity's behavior is often shackled to its internal state. As the humours shift—from calm to fury, from water to steam—the State pattern swaps the soul of the object, altering its reactions seamlessly.
