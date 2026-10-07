---
title: The Flyweight
description: Conserving magical essence by sharing immutable spell fragments.
type: pascal
gofPattern: Flyweight
gofCategory: Structural
arcaneSchool: "Abjuration // Efficiency"
formula: |2
  unit FlyweightPattern;
  interface
  type
    TSpellFragment = class
    public
      procedure Cast(Context: Integer);
    end;
  implementation
  end.
tags: [memory, sharing, efficiency]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---
Rigorous caching of magical patterns ensures minimal mana is wasted on redundant constructs.
