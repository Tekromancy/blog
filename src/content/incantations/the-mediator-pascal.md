---
title: The Mediator
description: A central hub coordinating complex interactions between volatile elementals.
type: pascal
gofPattern: Mediator
gofCategory: Behavioral
arcaneSchool: "Evocation // Coordination"
formula: |2
  unit MediatorPattern;
  interface
  type
    IElementalMediator = interface
      procedure Notify(Sender: TObject; Event: string);
    end;
  implementation
  end.
tags: [hub, coordination, decouple]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
Prevents elemental cross-contamination by routing all state changes through a singular governor.
