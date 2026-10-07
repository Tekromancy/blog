---
title: The Adapter
description: Translate incompatible data streams into a harmonious flow.
type: jcl
gofPattern: Adapter
gofCategory: Structural
arcaneSchool: "Transmutation // Job Control Wards"
formula: |2
  //ADAPTER  JOB (ACCT),'ADAPTER PATTERN',CLASS=A,MSGCLASS=X
  //* ADAPT THE 80-BYTE RECORD TO 133-BYTE PRINT FORMAT
  //STEP1    EXEC PGM=IEBGENER
  //SYSPRINT DD SYSOUT=*
  //SYSUT1   DD DSN=TEKROM.LEGACY.RUNES(OLD),DISP=SHR
  //SYSUT2   DD DSN=&&TEMP,DISP=(NEW,PASS),
  //            DCB=(RECFM=FBA,LRECL=133,BLKSIZE=1330),
  //            SPACE=(TRK,(1,1))
  //SYSIN    DD *
    GENERATE MAXFLDS=1
    RECORD FIELD=(80,1,,1)
  /*
  //* NEW PROGRAM CONSUMES THE ADAPTED STREAM
  //STEP2    EXEC PGM=NEWPRINT
  //INPUT    DD DSN=&&TEMP,DISP=(OLD,DELETE)
tags: [adapter, jcl, iebgener, temp-datasets]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
## The Adapter

When ancient mainframe systems collide with modern print spools, the Adapter pattern acts as a transmutative bridge. Using utilities like `IEBGENER` with embedded control statements, we can remap an 80-byte record into a 133-byte format expected by newer arcane processors. This temporary dataset `&&TEMP` serves as the intermediary, translating the incompatible streams without altering the underlying legacy code.
