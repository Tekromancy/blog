---
title: The Adapter
description: Bridging incompatible arcane frequencies and strict types.
type: pascal
gofPattern: Adapter
gofCategory: Structural
arcaneSchool: Transmutation // Frequency
formula: |
  unit AdapterPattern;
  interface
  type
    INewMagic = interface
      procedure Channel;
    end;
    TOldRelic = class
      procedure EmitEnergy;
    end;
    TRelicAdapter = class(TInterfacedObject, INewMagic)
    public
      procedure Channel;
    end;
  implementation
  end.
tags: [bridge, relic, structured]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
Wraps ancient, chaotic magical items into safe, typed interfaces.
