---
title: The Interpreter
description: Given a language, define a representation for its grammar along with an interpreter that uses the representation to interpret sentences.
type: pli
gofPattern: Interpreter
gofCategory: Behavioral
arcaneSchool: "Divination // Parsing"
formula: |2
  /* The Interpreter */
  INTERPRETER: PROC OPTIONS(MAIN);
     DCL 1 EXPRESSION BASED(E_PTR),
           2 INTERPRET ENTRY(CHAR(100)) RETURNS(BIT(1));
     PUT SKIP LIST('Parsing arcane JCL parameters...');
  END INTERPRETER;
tags: [interpreter, grammar, parsing]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---

The Interpreter evaluates expressions defined in a custom mainframe grammar, often using recursive structures and based variables.
