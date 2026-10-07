---
title: The Builder
description: Construct a complex arcane dataset step by step.
type: jcl
gofPattern: Builder
gofCategory: Creational
arcaneSchool: "Conjuration // Job Control Wards"
formula: |2
  //BUILDER  JOB (ACCT),'BUILDER PATTERN',CLASS=A,MSGCLASS=X
  //* STEP 1: INITIALIZE THE VESSEL (DATASET)
  //STEP1    EXEC PGM=IEFBR14
  //DD1      DD DSN=TEKROM.CONSTRUCT.VESSEL,
  //            DISP=(NEW,CATLG,DELETE),
  //            SPACE=(CYL,(5,5)),UNIT=SYSDA,
  //            DCB=(LRECL=80,RECFM=FB,BLKSIZE=800)
  //* STEP 2: IMBUE FIRST ESSENCE
  //STEP2    EXEC PGM=IEBGENER
  //SYSPRINT DD SYSOUT=*
  //SYSUT1   DD DSN=TEKROM.ESSENCE.ALPHA,DISP=SHR
  //SYSUT2   DD DSN=TEKROM.CONSTRUCT.VESSEL,DISP=(MOD,KEEP)
  //SYSIN    DD DUMMY
  //* STEP 3: IMBUE SECOND ESSENCE
  //STEP3    EXEC PGM=IEBGENER
  //SYSPRINT DD SYSOUT=*
  //SYSUT1   DD DSN=TEKROM.ESSENCE.BETA,DISP=SHR
  //SYSUT2   DD DSN=TEKROM.CONSTRUCT.VESSEL,DISP=(MOD,KEEP)
  //SYSIN    DD DUMMY
tags: [builder, jcl, multi-step, datasets]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
## The Builder

Constructing complex magical artifacts on the mainframe requires careful orchestration. The Builder pattern is realized as a multi-step job control ward. The first step allocates the ethereal vessel, while subsequent steps (like `IEBGENER`) incrementally imbue the vessel with different essences (data). The final constructed dataset is the realization of the Builder's work.
