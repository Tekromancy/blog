---
title: The Decorator
description: Attach additional responsibilities to a job step dynamically.
type: jcl
gofPattern: Decorator
gofCategory: Structural
arcaneSchool: "Transmutation // Job Control Wards"
formula: |2
  //DECORAT  JOB (ACCT),'DECORATOR PATTERN',CLASS=A,MSGCLASS=X
  //* WRAPPING A CORE TASK WITH PRE- AND POST-PROCESSING WARDS
  //PRESTEP  EXEC PGM=LOGSTART
  //SYSOUT   DD SYSOUT=*
  //PARM     DD *
    STARTING CORE RITUAL
  /*
  //*
  //CORESTEP EXEC PGM=MAINPROG
  //DATAIN   DD DSN=TEKROM.CORE.INPUT,DISP=SHR
  //*
  //POSTSTEP EXEC PGM=LOGEND
  //SYSOUT   DD SYSOUT=*
  //PARM     DD *
    ENDING CORE RITUAL
  /*
tags: [decorator, jcl, pre-step, post-step]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
## The Decorator

Sometimes a core computational ritual cannot be altered, yet its execution must be augmented with auditing or tracking sigils. The Decorator pattern is enacted in JCL by surrounding the primary job step with pre-processing and post-processing steps. These wrapper steps decorate the execution flow, adding logging or data-staging capabilities without needing to recompile the `MAINPROG` binary.
