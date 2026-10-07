---
title: Prototype Cloning Matrix
description: Duplicating complex enchanted objects rather than recreating them from scratch.
type: delphi
gofPattern: Prototype
gofCategory: Creational
arcaneSchool: "Illusion // Mirroring Magic"
formula: |2
  unit PrototypeCloning;

  interface

  type
    ICloneableRune = interface
      function Clone: ICloneableRune;
      procedure Reveal;
    end;

    TMirrorRune = class(TInterfacedObject, ICloneableRune)
    private
      FPowerLevel: Integer;
      FElement: string;
    public
      constructor Create(Power: Integer; Element: string);
      function Clone: ICloneableRune;
      procedure Reveal;
    end;

  implementation

  uses System.SysUtils;

  constructor TMirrorRune.Create(Power: Integer; Element: string);
  begin
    FPowerLevel := Power;
    FElement := Element;
  end;

  function TMirrorRune.Clone: ICloneableRune;
  begin
    // Simple shallow copy for the incantation
    Result := TMirrorRune.Create(FPowerLevel, FElement);
  end;

  procedure TMirrorRune.Reveal;
  begin
    Writeln(Format('Rune glowing with %s energy at level %d.', [FElement, FPowerLevel]));
  end;

  end.
tags: [delphi, gof, creational, illusion, prototype]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

Creating a VCL enchantment can drain the mystic reserves. By employing the Prototype Matrix, an adept illusionist clones an existing matrix instead of paying the initialization cost.
