---
title: The Composite
description: Treat individual wards and compositions of wards uniformly.
type: jcl
gofPattern: Composite
gofCategory: Structural
arcaneSchool: "Transmutation // Job Control Wards"
formula: |2
  //COMPOSIT JOB (ACCT),'COMPOSITE PATTERN',CLASS=A,MSGCLASS=X
  //         JCLLIB ORDER=(TEKROM.WARDS.PROCLIB)
  //*
  //* INCLUDE GROUP TREATED AS A SINGLE ENTITY
  //STEP1    EXEC PGM=IEFBR14
  //         INCLUDE MEMBER=BASEDD
  //*
  //* PROC THAT INTERNALLY CONTAINS MORE INCLUDES/STEPS
  //STEP2    EXEC PROC=COMPPROC
  //*
  //* COMPPROC CAN BE EXECUTED JUST LIKE A REGULAR STEP
tags: [composite, jcl, include, nested-procs]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
## The Composite

The Composite pattern in JCL allows cyber-mages to build complex incantations from simpler components, treating nested `INCLUDE` groups and cataloged `PROC`s with the same uniform reverence as a single native step. A massive daily aggregation job can consist of just a few lines of JCL, masking the intricate, fractal hierarchy of nested wards that compose its true nature.
