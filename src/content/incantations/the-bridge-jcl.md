---
title: The Bridge
description: Decouple an abstraction from its implementation so the two can vary independently.
type: jcl
gofPattern: Bridge
gofCategory: Structural
arcaneSchool: "Transmutation // Job Control Wards"
formula: |2
  //BRIDGE   JOB (ACCT),'BRIDGE PATTERN',CLASS=A,MSGCLASS=X
  //* THE PROC IS THE ABSTRACTION
  //* THE DD OVERRIDES ARE THE IMPLEMENTATION
  //         JCLLIB ORDER=(TEKROM.WARDS.PROCLIB)
  //*
  //PRODEXEC EXEC PROC=MYPROC
  //STEP1.INPUT DD DSN=TEKROM.PROD.DATA,DISP=SHR
  //STEP1.OUT   DD DSN=TEKROM.PROD.REPORT,DISP=OLD
  //*
  //TESTEXEC EXEC PROC=MYPROC
  //STEP1.INPUT DD DSN=TEKROM.TEST.DATA,DISP=SHR
  //STEP1.OUT   DD SYSOUT=*
tags: [bridge, jcl, proc-overrides, abstraction]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
## The Bridge

In Job Control Wards, the Bridge pattern separates the abstract sequence of operations from the concrete data vessels. A cataloged procedure (PROC) defines the immutable logic—the steps and programs to execute. However, the exact datasets it operates on are bridged at execution time via DD overrides. This decoupling allows the same ritual to seamlessly bridge between production data matrices and localized testing environments.
