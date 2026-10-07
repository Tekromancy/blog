---
title: Factory Method Wards
description: Entrusting the exact type of enchantment to the sub-classes of the magical order.
type: delphi
gofPattern: Factory Method
gofCategory: Creational
arcaneSchool: "Conjuration // Sub-school of Deferral"
formula: |2
  unit FactoryMethodWards;

  interface

  type
    IVCLWard = interface
      procedure Activate;
    end;

    TWardWeaver = class abstract
    protected
      function ConjureWard: IVCLWard; virtual; abstract;
    public
      procedure CastProtection;
    end;

    TShadowWard = class(TInterfacedObject, IVCLWard)
    public
      procedure Activate;
    end;

    TShadowWeaver = class(TWardWeaver)
    protected
      function ConjureWard: IVCLWard; override;
    end;

  implementation

  uses System.SysUtils;

  procedure TShadowWard.Activate;
  begin
    Writeln('A shadow ward wraps around the form components.');
  end;

  procedure TWardWeaver.CastProtection;
  var
    Ward: IVCLWard;
  begin
    Ward := ConjureWard;
    Writeln('Weaving pre-incantation signs...');
    Ward.Activate;
    Writeln('Ward sealed.');
  end;

  function TShadowWeaver.ConjureWard: IVCLWard;
  begin
    Result := TShadowWard.Create;
  end;

  end.
tags: [delphi, gof, creational, conjuration, factory-method]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

The ancient Weaver initiates the ritual, but only the specific lineage (the subclass) dictates which `IVCLWard` is brought forth to guard the realm.
