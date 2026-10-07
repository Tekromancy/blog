---
title: Observer of the Scrying Orbs
description: Crystal orbs watching for changes in the primary Ley Line and reacting instantly.
type: delphi
gofPattern: Observer
gofCategory: Behavioral
arcaneSchool: "Divination // Scrying Reactions"
formula: |2
  unit ObserverOrbs;

  interface

  uses System.Generics.Collections;

  type
    IScryingOrb = interface
      procedure Update(PowerLevel: Integer);
    end;

    TLeyLine = class
    private
      FOrbs: TList<IScryingOrb>;
      FPowerLevel: Integer;
      procedure SetPowerLevel(Value: Integer);
    public
      constructor Create;
      destructor Destroy; override;
      procedure Attach(Orb: IScryingOrb);
      procedure NotifyOrbs;
      property PowerLevel: Integer read FPowerLevel write SetPowerLevel;
    end;

    TCrystalOrb = class(TInterfacedObject, IScryingOrb)
    private
      FName: string;
    public
      constructor Create(Name: string);
      procedure Update(PowerLevel: Integer);
    end;

  implementation

  uses System.SysUtils;

  constructor TLeyLine.Create;
  begin
    FOrbs := TList<IScryingOrb>.Create;
  end;

  destructor TLeyLine.Destroy;
  begin
    FOrbs.Free;
    inherited;
  end;

  procedure TLeyLine.Attach(Orb: IScryingOrb);
  begin
    FOrbs.Add(Orb);
  end;

  procedure TLeyLine.SetPowerLevel(Value: Integer);
  begin
    if FPowerLevel <> Value then
    begin
      FPowerLevel := Value;
      NotifyOrbs;
    end;
  end;

  procedure TLeyLine.NotifyOrbs;
  var
    Orb: IScryingOrb;
  begin
    for Orb in FOrbs do
      Orb.Update(FPowerLevel);
  end;

  constructor TCrystalOrb.Create(Name: string);
  begin
    FName := Name;
  end;

  procedure TCrystalOrb.Update(PowerLevel: Integer);
  begin
    Writeln(Format('Orb "%s" glows! Detected Ley Line power level: %d', [FName, PowerLevel]));
  end;

  end.
tags: [delphi, gof, behavioral, divination, observer]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Ley Line pulses with energy. Rather than having the orbs poll the line constantly, burning precious mana, the Observer pattern binds them to the line itself. The moment the power changes, the line broadcasts the update.
