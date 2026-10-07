---
title: The Interpreter of the Forbidden Lexicon
description: Translating arcane sentences into executable curses by parsing the grammar of the ancient ones.
type: cobol
gofPattern: Interpreter
gofCategory: Behavioral
arcaneSchool: Necromancy // Corp-mancy
formula: |
       IDENTIFICATION DIVISION.
       CLASS-ID. HEX-EXPRESSION INHERITS BASE-EXPRESSION.
       
       ENVIRONMENT DIVISION.
       CONFIGURATION SECTION.
       REPOSITORY.
           CLASS BASE-EXPRESSION IS "BaseExpression"
           CLASS CONTEXT-MAP IS "ContextMap".
           
       OBJECT.
       DATA DIVISION.
       WORKING-STORAGE SECTION.
       01 VARIABLE-NAME PIC X(20).
       
       PROCEDURE DIVISION.
       
       IDENTIFICATION DIVISION.
       METHOD-ID. NEW.
       DATA DIVISION.
       LINKAGE SECTION.
       01 IN-VAR PIC X(20).
       PROCEDURE DIVISION USING IN-VAR.
           MOVE IN-VAR TO VARIABLE-NAME.
       END METHOD NEW.
       
       IDENTIFICATION DIVISION.
       METHOD-ID. INTERPRET.
       DATA DIVISION.
       LINKAGE SECTION.
       01 IN-CONTEXT OBJECT REFERENCE CONTEXT-MAP.
       01 RET-VAL    PIC 9(4).
       PROCEDURE DIVISION USING IN-CONTEXT RETURNING RET-VAL.
           * Look up the cursed variable in the ancient context
           INVOKE IN-CONTEXT "GET-VALUE" USING VARIABLE-NAME RETURNING RET-VAL.
           * Apply a baseline curse modifier
           COMPUTE RET-VAL = RET-VAL * 666.
       END METHOD INTERPRET.
       
       END OBJECT.
       END CLASS HEX-EXPRESSION.
tags: [necromancy, mainframe, gof, behavioral]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

To speak the language of the void, one must parse its terrible grammar. The Interpreter pattern defines a class for each rule in the Forbidden Lexicon. By chaining these expression objects together, the necromancer can read an ancient scroll and compile it into a live, executing curse upon the mainframe's memory.
