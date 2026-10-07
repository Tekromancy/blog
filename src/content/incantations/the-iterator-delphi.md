---
title: Iterator of Dimensions
description: Safely traversing a hidden dimensional pocket of magical components.
type: delphi
gofPattern: Iterator
gofCategory: Behavioral
arcaneSchool: "Divination // Dimensional Traversal"
formula: |2
  unit IteratorDimensions;

  interface

  uses System.Generics.Collections;

  type
    IIterator = interface
      function HasNext: Boolean;
      function Next: string;
    end;

    IDimensionalPocket = interface
      function CreateIterator: IIterator;
    end;

    TPocketIterator = class(TInterfacedObject, IIterator)
    private
      FItems: TList<string>;
      FPosition: Integer;
    public
      constructor Create(Items: TList<string>);
      function HasNext: Boolean;
      function Next: string;
    end;

    TGrimoirePocket = class(TInterfacedObject, IDimensionalPocket)
    private
      FItems: TList<string>;
    public
      constructor Create;
      destructor Destroy; override;
      procedure AddSpell(Spell: string);
      function CreateIterator: IIterator;
    end;

  implementation

  uses System.SysUtils;

  constructor TPocketIterator.Create(Items: TList<string>);
  begin
    FItems := Items;
    FPosition := 0;
  end;

  function TPocketIterator.HasNext: Boolean;
  begin
    Result := FPosition < FItems.Count;
  end;

  function TPocketIterator.Next: string;
  begin
    Result := FItems[FPosition];
    Inc(FPosition);
  end;

  constructor TGrimoirePocket.Create;
  begin
    FItems := TList<string>.Create;
  end;

  destructor TGrimoirePocket.Destroy;
  begin
    FItems.Free;
    inherited;
  end;

  procedure TGrimoirePocket.AddSpell(Spell: string);
  begin
    FItems.Add(Spell);
  end;

  function TGrimoirePocket.CreateIterator: IIterator;
  begin
    Result := TPocketIterator.Create(FItems);
  end;

  end.
tags: [delphi, gof, behavioral, divination, iterator]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

The contents of the Grimoire Pocket are vast and chaotic. The Iterator gives the magus a secure, step-by-step path through the dimension, without exposing the dangerous inner mechanics of the spatial rift.
