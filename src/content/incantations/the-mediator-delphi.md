---
title: Mediator of the Ley Lines
description: A central hub that coordinates complex interactions between scattered wards.
type: delphi
gofPattern: Mediator
gofCategory: Behavioral
arcaneSchool: "Abjuration // Ley Coordination"
formula: |2
  unit MediatorLeyLines;

  interface

  type
    TWard = class;

    ILeyLineHub = interface
      procedure Notify(Sender: TWard; Event: string);
    end;

    TWard = class abstract
    protected
      FHub: ILeyLineHub;
    public
      constructor Create(Hub: ILeyLineHub);
    end;

    TFireWard = class(TWard)
    public
      procedure Trigger;
    end;

    TIceWard = class(TWard)
    public
      procedure CoolDown;
    end;

    TMasterHub = class(TInterfacedObject, ILeyLineHub)
    private
      FFire: TFireWard;
      FIce: TIceWard;
    public
      procedure SetWards(Fire: TFireWard; Ice: TIceWard);
      procedure Notify(Sender: TWard; Event: string);
    end;

  implementation

  uses System.SysUtils;

  constructor TWard.Create(Hub: ILeyLineHub);
  begin
    FHub := Hub;
  end;

  procedure TFireWard.Trigger;
  begin
    Writeln('Fire ward triggers!');
    FHub.Notify(Self, 'Ignite');
  end;

  procedure TIceWard.CoolDown;
  begin
    Writeln('Ice ward releases cooling mist.');
  end;

  procedure TMasterHub.SetWards(Fire: TFireWard; Ice: TIceWard);
  begin
    FFire := Fire;
    FIce := Ice;
  end;

  procedure TMasterHub.Notify(Sender: TWard; Event: string);
  begin
    if (Sender = FFire) and (Event = 'Ignite') then
    begin
      Writeln('Master Hub detects fire! Activating ice to balance the temperature.');
      if Assigned(FIce) then
        FIce.CoolDown;
    end;
  end;

  end.
tags: [delphi, gof, behavioral, abjuration, mediator]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

Wards that speak directly to one another create a tangled, explosive web of dependencies. The Master Hub acts as the ultimate Mediator, listening to the murmurs of the components and dictating the counter-spells centrally.
