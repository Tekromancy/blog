---
title: Abstract Factory Runes
description: Manifesting entire families of related VCL wards without specifying their concrete forms.
type: delphi
gofPattern: Abstract Factory
gofCategory: Creational
arcaneSchool: "Conjuration // Visual Component Wards"
formula: |2
  unit AbstractFactoryWards;

  interface

  type
    IVisualWard = interface
      ['{3C3C7C6D-9E9C-4E7B-8B58-45F4D3C5C3F0}']
      procedure Manifest;
    end;

    ISpiritGuide = interface
      ['{1A2B3C4D-5E6F-7A8B-9C0D-1E2F3A4B5C6D}']
      procedure Whisper;
    end;

    IOracleFactory = interface
      ['{A1B2C3D4-E5F6-4A5B-8C7D-E9F0A1B2C3D4}']
      function CreateWard: IVisualWard;
      function CreateGuide: ISpiritGuide;
    end;

    TFireOracleFactory = class(TInterfacedObject, IOracleFactory)
    public
      function CreateWard: IVisualWard;
      function CreateGuide: ISpiritGuide;
    end;

  implementation

  uses System.SysUtils;

  type
    TFireWard = class(TInterfacedObject, IVisualWard)
    public
      procedure Manifest;
    end;

    TFireGuide = class(TInterfacedObject, ISpiritGuide)
    public
      procedure Whisper;
    end;

  procedure TFireWard.Manifest;
  begin
    Writeln('A ward of crimson fire materializes on the VCL form!');
  end;

  procedure TFireGuide.Whisper;
  begin
    Writeln('The fire guide whispers prophecies of cinders.');
  end;

  function TFireOracleFactory.CreateWard: IVisualWard;
  begin
    Result := TFireWard.Create;
  end;

  function TFireOracleFactory.CreateGuide: ISpiritGuide;
  begin
    Result := TFireGuide.Create;
  end;

  end.
tags: [delphi, gof, creational, conjuration, abstract-factory]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Oracle of Forms conjures whole families of intertwined visual enchantments. By relying on `IOracleFactory`, the Archmage needs not know whether the flames or the frost respond to their call.
