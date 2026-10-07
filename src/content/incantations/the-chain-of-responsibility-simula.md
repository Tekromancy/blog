---
title: The Chain of Responsibility Incantation in Simula
description: Passing a mystical request along a sequence of potential handlers.
type: simula
gofPattern: Chain of Responsibility
gofCategory: Behavioral
arcaneSchool: "Evocation // Delegation"
formula: |2
  Begin
      Class Handler;
      Virtual: Procedure HandleRequest;
      Begin
          Ref(Handler) successor;
      End;

      Handler Class ConcreteHandler;
      Begin
          Procedure HandleRequest;
          Begin
              If CanHandle Then
                  ! Resolve the magic;
              Else If successor =/= None Then
                  successor.HandleRequest;
          End;
      End;
  End;
tags: [simula, gof, behavioral, delegation]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

When a request is cast into the simulation, it is caught by the Chain. If the first node cannot process the incantation, it passes it along the ethereal links until an adept handler quells the invocation.
