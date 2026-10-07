---
title: The State
description: An entity that alters its behavior entirely when its internal alignment shifts.
type: pascal
gofPattern: State
gofCategory: Behavioral
arcaneSchool: "Transmutation // Shifting"
formula: |2
  unit StatePattern;
  interface
  type
    IAlignmentState = interface
      procedure Act;
    end;
    TEntity = class
    private
      FState: IAlignmentState;
    public
      procedure PerformAction;
    end;
  implementation
  end.
tags: [alignment, shifting, dynamic]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
Models polymorphic phase-shifts inside rigorous boundaries.
