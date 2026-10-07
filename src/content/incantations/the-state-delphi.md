---
title: State of the Wand
description: A magic wand that changes its spell output based on its internal elemental attunement.
type: delphi
gofPattern: State
gofCategory: Behavioral
arcaneSchool: "Transmutation // Elemental Attunement"
formula: |2
  unit StateWand;

  interface

  type
    IWandState = interface
      procedure CastSpell;
    end;

    TFireState = class(TInterfacedObject, IWandState)
    public
      procedure CastSpell;
    end;

    TIceState = class(TInterfacedObject, IWandState)
    public
      procedure CastSpell;
    end;

    TMagicWand = class
    private
      FState: IWandState;
    public
      constructor Create(InitialState: IWandState);
      procedure SetState(NewState: IWandState);
      procedure Cast;
    end;

  implementation

  uses System.SysUtils;

  procedure TFireState.CastSpell;
  begin
    Writeln('The wand shoots a searing fireball!');
  end;

  procedure TIceState.CastSpell;
  begin
    Writeln('The wand releases a freezing cone of cold!');
  end;

  constructor TMagicWand.Create(InitialState: IWandState);
  begin
    FState := InitialState;
  end;

  procedure TMagicWand.SetState(NewState: IWandState);
  begin
    FState := NewState;
    Writeln('Wand attunement shifted.');
  end;

  procedure TMagicWand.Cast;
  begin
    FState.CastSpell;
  end;

  end.
tags: [delphi, gof, behavioral, transmutation, state]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

The Wand itself does not contain branching conditional logic for every possible element. Instead, it delegates its casting to its internal state object. By swapping the state, the Wand's behavior transmutes instantly.
