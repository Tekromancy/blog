---
title: Chain of Amulets
description: Passing a curse through a chain of mystical filters until one absorbs it.
type: delphi
gofPattern: Chain of Responsibility
gofCategory: Behavioral
arcaneSchool: "Abjuration // Curse Deflection"
formula: |2
  unit ChainOfAmulets;

  interface

  type
    TAmulet = class
    protected
      FNext: TAmulet;
    public
      procedure SetNext(NextAmulet: TAmulet);
      procedure HandleCurse(Severity: Integer); virtual;
    end;

    TSilverAmulet = class(TAmulet)
    public
      procedure HandleCurse(Severity: Integer); override;
    end;

    TGoldAmulet = class(TAmulet)
    public
      procedure HandleCurse(Severity: Integer); override;
    end;

  implementation

  uses System.SysUtils;

  procedure TAmulet.SetNext(NextAmulet: TAmulet);
  begin
    FNext := NextAmulet;
  end;

  procedure TAmulet.HandleCurse(Severity: Integer);
  begin
    if Assigned(FNext) then
      FNext.HandleCurse(Severity)
    else
      Writeln('The curse breached all defenses!');
  end;

  procedure TSilverAmulet.HandleCurse(Severity: Integer);
  begin
    if Severity <= 5 then
      Writeln('Silver Amulet absorbed the minor curse.')
    else
      inherited HandleCurse(Severity);
  end;

  procedure TGoldAmulet.HandleCurse(Severity: Integer);
  begin
    if Severity <= 10 then
      Writeln('Gold Amulet absorbed the major curse.')
    else
      inherited HandleCurse(Severity);
  end;

  end.
tags: [delphi, gof, behavioral, abjuration, chain-of-responsibility]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

When a dark hex is thrown at the system, it strikes the first amulet in the chain. If the ward cannot contain the power, it delegates it to the next, until the curse is neutralized or the system perishes.
