---
title: Interpreter of Arcane Dialects
description: Parse a mini-language for dynamic JCL generation.
type: rexx
gofPattern: Interpreter
gofCategory: Behavioral
arcaneSchool: "Divination // Linguistics"
formula: |2
  /* ooRexx Interpreter */
  ::class Expression abstract
  ::method interpret abstract

  ::class JobNameExpression subclass Expression
  ::attribute name
  ::method init
    use arg name
    self~name = name
  ::method interpret
    return "//"||self~name||" JOB (ACCT),'DYNAMIC'"
tags: [interpreter, parsing, rexx]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---
The Interpreter deciphers a higher-level arcane dialect and transcribes it down into the base JCL required by the job entry subsystem.
