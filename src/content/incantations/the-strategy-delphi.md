---
title: Strategy of the Seeking Missiles
description: Swappable targeting algorithms for arcane projectiles.
type: delphi
gofPattern: Strategy
gofCategory: Behavioral
arcaneSchool: "Evocation // Tactical Casting"
formula: |2
  unit StrategyMissiles;

  interface

  type
    ITargetingStrategy = interface
      function FindTarget: string;
    end;

    TNearestTarget = class(TInterfacedObject, ITargetingStrategy)
    public
      function FindTarget: string;
    end;

    THighestManaTarget = class(TInterfacedObject, ITargetingStrategy)
    public
      function FindTarget: string;
    end;

    TSpellMissile = class
    private
      FStrategy: ITargetingStrategy;
    public
      constructor Create(Strategy: ITargetingStrategy);
      procedure SetStrategy(Strategy: ITargetingStrategy);
      procedure Fire;
    end;

  implementation

  uses System.SysUtils;

  function TNearestTarget.FindTarget: string;
  begin
    Result := 'Goblin Skirmisher (Distance: 5m)';
  end;

  function THighestManaTarget.FindTarget: string;
  begin
    Result := 'Lich King (Mana: 9000)';
  end;

  constructor TSpellMissile.Create(Strategy: ITargetingStrategy);
  begin
    FStrategy := Strategy;
  end;

  procedure TSpellMissile.SetStrategy(Strategy: ITargetingStrategy);
  begin
    FStrategy := Strategy;
  end;

  procedure TSpellMissile.Fire;
  begin
    Writeln('Missile fired! Locked onto: ', FStrategy.FindTarget);
  end;

  end.
tags: [delphi, gof, behavioral, evocation, strategy]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

A magic missile is useless if it cannot find its mark. The Strategy incantation isolates the targeting algorithm from the explosive payload, allowing the Evoker to swap tactics mid-combat without rewriting the spell.
