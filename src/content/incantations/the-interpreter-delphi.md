---
title: Interpreter of Runes
description: Parsing a string of ancient symbols into an executable magical sequence.
type: delphi
gofPattern: Interpreter
gofCategory: Behavioral
arcaneSchool: "Divination // Symbolic Parsing"
formula: |2
  unit InterpreterRunes;

  interface

  type
    IRuneExpression = interface
      procedure Interpret(var Context: string);
    end;

    TFireRune = class(TInterfacedObject, IRuneExpression)
    public
      procedure Interpret(var Context: string);
    end;

    TIceRune = class(TInterfacedObject, IRuneExpression)
    public
      procedure Interpret(var Context: string);
    end;

  implementation

  uses System.SysUtils;

  procedure TFireRune.Interpret(var Context: string);
  begin
    if Pos('F', Context) > 0 then
    begin
      Writeln('Interpreted Fire Rune: A burst of flame.');
      Context := StringReplace(Context, 'F', '', [rfReplaceAll]);
    end;
  end;

  procedure TIceRune.Interpret(var Context: string);
  begin
    if Pos('I', Context) > 0 then
    begin
      Writeln('Interpreted Ice Rune: A blast of frost.');
      Context := StringReplace(Context, 'I', '', [rfReplaceAll]);
    end;
  end;

  end.
tags: [delphi, gof, behavioral, divination, interpreter]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---

The language of the ancients is written in symbols. The Interpreter breaks down the raw string of characters, matching each glyph to its corresponding elemental class, resolving the grammar of magic into raw kinetic output.
