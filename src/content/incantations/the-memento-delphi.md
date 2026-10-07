---
title: Memento of Chronos
description: Storing a snapshot of an object's arcane state in a time crystal.
type: delphi
gofPattern: Memento
gofCategory: Behavioral
arcaneSchool: "Chronomancy // State Preservation"
formula: |2
  unit MementoChronos;

  interface

  type
    TTimeCrystal = class
    private
      FState: string;
    public
      constructor Create(State: string);
      function GetState: string;
    end;

    TSpellWeaver = class
    private
      FState: string;
    public
      procedure SetState(State: string);
      function SaveToCrystal: TTimeCrystal;
      procedure RestoreFromCrystal(Crystal: TTimeCrystal);
      procedure PrintState;
    end;

  implementation

  uses System.SysUtils;

  constructor TTimeCrystal.Create(State: string);
  begin
    FState := State;
  end;

  function TTimeCrystal.GetState: string;
  begin
    Result := FState;
  end;

  procedure TSpellWeaver.SetState(State: string);
  begin
    Writeln('Weaver state changes to: ', State);
    FState := State;
  end;

  function TSpellWeaver.SaveToCrystal: TTimeCrystal;
  begin
    Writeln('Saving state to Time Crystal...');
    Result := TTimeCrystal.Create(FState);
  end;

  procedure TSpellWeaver.RestoreFromCrystal(Crystal: TTimeCrystal);
  begin
    FState := Crystal.GetState;
    Writeln('Restored state from Time Crystal: ', FState);
  end;

  procedure TSpellWeaver.PrintState;
  begin
    Writeln('Current State: ', FState);
  end;

  end.
tags: [delphi, gof, behavioral, chronomancy, memento]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

When a casting goes terribly wrong, the Chronomancer relies on the Memento. A Time Crystal stores the pure essence of the state, opaque to outsiders, ready to snap the universe back to its uncorrupted form.
