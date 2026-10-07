---
title: The Bridge
description: Decoupling the mystical abstraction from its implementation planar binding.
type: pascal
gofPattern: Bridge
gofCategory: Structural
arcaneSchool: "Abjuration // Planar"
formula: |2
  unit BridgePattern;
  interface
  type
    IEnergySource = interface
      procedure Tap;
    end;
    TSpellMatrix = class
    protected
      FSource: IEnergySource;
    public
      procedure Execute; virtual; abstract;
    end;
  implementation
  end.
tags: [decoupling, matrix, planar]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
A rigorous separation of the spell's logical form and its energetic foundation.
