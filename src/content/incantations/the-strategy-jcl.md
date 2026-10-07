---
title: The Strategy
description: Define a family of algorithms, encapsulate each one, and make them interchangeable.
type: jcl
gofPattern: Strategy
gofCategory: Behavioral
arcaneSchool: "Enchantment // Job Control Wards"
formula: |2
  //STRATEGY JOB (ACCT),'STRATEGY PATTERN',CLASS=A,MSGCLASS=X
  //* INJECT THE DESIRED STRATEGY VIA STEPLIB OVERRIDE
  //         SET STRATLIB='TEKROM.FAST.ALGO.LOAD'
  //*
  //STEP1    EXEC PGM=PROCESSOR
  //STEPLIB  DD DSN=&STRATLIB,DISP=SHR
  //INPUT    DD DSN=TEKROM.RAW.DATA,DISP=SHR
  //OUTPUT   DD DSN=TEKROM.PROCESSED.DATA,DISP=(NEW,CATLG,DELETE)
tags: [strategy, jcl, steplib, dynamic-execution]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
## The Strategy

To dynamically swap algorithms without altering the core JCL structure, the Strategy pattern utilizes the `STEPLIB` concatenation. By parameterizing the load library via a symbolic variable `&STRATLIB`, a techno-mage can choose to inject an optimized `FAST.ALGO` library or a verbose `DEBUG.ALGO` library at runtime. The `PROCESSOR` program executes identically, but its underlying strategic magic is swapped seamlessly by the system loader.
