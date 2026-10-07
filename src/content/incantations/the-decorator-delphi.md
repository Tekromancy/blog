---
title: Decorator of Enhancements
description: Dynamically layering additional power onto an existing spell.
type: delphi
gofPattern: Decorator
gofCategory: Structural
arcaneSchool: "Transmutation // Spell Layering"
formula: |2
  unit DecoratorEnhancements;

  interface

  type
    ISpell = interface
      procedure Cast;
    end;

    TBaseSpell = class(TInterfacedObject, ISpell)
    public
      procedure Cast;
    end;

    TSpellDecorator = class(TInterfacedObject, ISpell)
    protected
      FSpell: ISpell;
    public
      constructor Create(Spell: ISpell);
      procedure Cast; virtual;
    end;

    TEchoDecorator = class(TSpellDecorator)
    public
      procedure Cast; override;
    end;

  implementation

  uses System.SysUtils;

  procedure TBaseSpell.Cast;
  begin
    Writeln('Casting the foundational spell...');
  end;

  constructor TSpellDecorator.Create(Spell: ISpell);
  begin
    FSpell := Spell;
  end;

  procedure TSpellDecorator.Cast;
  begin
    if Assigned(FSpell) then
      FSpell.Cast;
  end;

  procedure TEchoDecorator.Cast;
  begin
    inherited Cast;
    Writeln('The spell echoes through the astral plane! (Decorator effect added)');
  end;

  end.
tags: [delphi, gof, structural, transmutation, decorator]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The true art of Transmutation lies not in breaking the old spell, but wrapping it in new runes. The Decorator layers enchantments around a base spell, granting it echoes, fiery trails, or vampiric leeches without altering the original code.
