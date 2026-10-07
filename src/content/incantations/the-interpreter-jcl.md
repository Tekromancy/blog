---
title: The Interpreter
description: Given a language, define a representation for its grammar along with an interpreter.
type: jcl
gofPattern: Interpreter
gofCategory: Behavioral
arcaneSchool: "Enchantment // Job Control Wards"
formula: |2
  //INTERP   JOB (ACCT),'INTERPRETER',CLASS=A,MSGCLASS=X
  //* INVOKING THE REXX INTERPRETER FROM WITHIN JCL
  //STEP1    EXEC PGM=IKJEFT01
  //SYSEXEC  DD DSN=TEKROM.REXX.EXEC,DISP=SHR
  //SYSTSPRT DD SYSOUT=*
  //SYSTSIN  DD *
    %SPELLCAST MANA=100 TARGET=SYSTEM
  /*
tags: [interpreter, jcl, rexx, ikjeft01]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
## The Interpreter

While JCL orchestrates the overarching ritual, it often delegates complex logical parsing to an embedded Interpreter. By invoking the `IKJEFT01` processor, the mainframe can seamlessly interpret REXX macros defined in a `SYSEXEC` library. The embedded `%SPELLCAST` command represents a specialized domain language, interpreted on-the-fly to manipulate system variables beyond standard JCL capabilities.
