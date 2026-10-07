---
title: Adapter of Ancient Runes
description: Bridging the forgotten magics of old libraries to modern interfaces.
type: delphi
gofPattern: Adapter
gofCategory: Structural
arcaneSchool: "Transmutation // Interface Shifting"
formula: |2
  unit AdapterRunes;

  interface

  type
    ITargetSpell = interface
      procedure CastModernSpell;
    end;

    TAncientGrimoire = class
    public
      procedure CastAncientHex;
    end;

    TSpellAdapter = class(TInterfacedObject, ITargetSpell)
    private
      FGrimoire: TAncientGrimoire;
    public
      constructor Create(Grimoire: TAncientGrimoire);
      procedure CastModernSpell;
    end;

  implementation

  uses System.SysUtils;

  procedure TAncientGrimoire.CastAncientHex;
  begin
    Writeln('Casting a dusty, forgotten hex from the deep archives.');
  end;

  constructor TSpellAdapter.Create(Grimoire: TAncientGrimoire);
  begin
    FGrimoire := Grimoire;
  end;

  procedure TSpellAdapter.CastModernSpell;
  begin
    Writeln('Translating modern request to ancient tongues...');
    FGrimoire.CastAncientHex;
  end;

  end.
tags: [delphi, gof, structural, transmutation, adapter]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

When the new visual framework cannot comprehend the old ways, the Adapter spell translates the raw magical energy. It shifts the interface, turning archaic invocations into a format the VCL easily digests.
