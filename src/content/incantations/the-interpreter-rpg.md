---
title: "Interpreter: The Arcane Lexicon"
description: "Given a language, define a representation for its grammar along with an interpreter."
type: rpg
gofPattern: Interpreter
gofCategory: Behavioral
arcaneSchool: "Divination // Comprehension"
formula: |2
  **FREE
  Ctl-Opt NoMain;

  // A simplistic grammar parser rune
  Dcl-Proc InterpretCommand Export;
    Dcl-Pi *N Ind;
      Expression Char(50) Const;
    End-Pi;

    Dcl-S Op Char(10);
    Dcl-S Arg Char(40);

    Op = %Subst(Expression: 1: %Scan(' ': Expression)-1);
    Arg = %Subst(Expression: %Scan(' ': Expression)+1);

    Select;
      When Op = 'CAST';
        Return CastSpell(Arg);
      When Op = 'BIND';
        Return BindWard(Arg);
      Other;
        Return *Off;
    EndSl;
  End-Proc;
tags: [behavioral, ibm-i, runes, interpreter]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---

# Interpreter

RPG is a language of fixed forms and business logic, but sometimes users need a tiny Domain Specific Language (DSL). The Interpreter parses these text strings and maps them directly into subsystem calls, translating user intent into mainframe action.
