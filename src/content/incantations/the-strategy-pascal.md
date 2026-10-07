---
title: The Strategy
description: Interchanging combat algorithms on the fly against adapting horrors.
type: pascal
gofPattern: Strategy
gofCategory: Behavioral
arcaneSchool: Evocation // Tactics
formula: |
  unit StrategyPattern;
  interface
  type
    ICombatStrategy = interface
      procedure ExecuteStrike;
    end;
    TSpellCaster = class
    private
      FStrategy: ICombatStrategy;
    public
      procedure Attack;
    end;
  implementation
  end.
tags: [tactics, interchanging, algorithms]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
Delegates the specific execution of a mystical assault to encapsulated strategy objects.
