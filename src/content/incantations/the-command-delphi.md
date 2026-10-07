---
title: Command Scrolls
description: Encapsulating spells into scrolls for delayed casting or undoing.
type: delphi
gofPattern: Command
gofCategory: Behavioral
arcaneSchool: "Enchantment // Spell Storing"
formula: |2
  unit CommandScrolls;

  interface

  type
    ISpellCommand = interface
      procedure Execute;
      procedure Undo;
    end;

    TLeyLine = class
    public
      procedure Surge;
      procedure Calm;
    end;

    TSurgeScroll = class(TInterfacedObject, ISpellCommand)
    private
      FLeyLine: TLeyLine;
    public
      constructor Create(LeyLine: TLeyLine);
      procedure Execute;
      procedure Undo;
    end;

  implementation

  uses System.SysUtils;

  procedure TLeyLine.Surge;
  begin
    Writeln('The ley line surges with crackling blue energy!');
  end;

  procedure TLeyLine.Calm;
  begin
    Writeln('The ley line returns to a peaceful hum.');
  end;

  constructor TSurgeScroll.Create(LeyLine: TLeyLine);
  begin
    FLeyLine := LeyLine;
  end;

  procedure TSurgeScroll.Execute;
  begin
    FLeyLine.Surge;
  end;

  procedure TSurgeScroll.Undo;
  begin
    FLeyLine.Calm;
  end;

  end.
tags: [delphi, gof, behavioral, enchantment, command]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

A spell need not be cast immediately upon invocation. By sealing the magic within a `TSurgeScroll`, the Archmage can build a queue of spells, casting them at the opportune moment, or reversing them if the weave goes awry.
