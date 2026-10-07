---
title: The Adapter Incantation in Simula
description: Translating arcane interfaces to bridge incompatible simulation objects.
type: simula
gofPattern: Adapter
gofCategory: Structural
arcaneSchool: "Transmutation // Integration"
formula: |2
  Begin
      Class Target;
      Virtual: Procedure Request;
      Begin
      End;

      Target Class Adapter(adaptee); Ref(AdapteeClass) adaptee;
      Begin
          Procedure Request;
          Begin
              adaptee.SpecificRequest;
          End;
      End;
  End;
tags: [simula, gof, structural, integration]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

When foreign relics speak an unknown tongue, the Adapter weaves a linguistic conduit. It wraps an incompatible object, adapting its interface so it may converse smoothly with the native constructs of the simulation.
