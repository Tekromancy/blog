---
title: The Memento
description: Capture and externalize an object's internal state so that it can be restored later.
type: jcl
gofPattern: Memento
gofCategory: Behavioral
arcaneSchool: "Enchantment // Job Control Wards"
formula: |2
  //MEMENTO  JOB (ACCT),'MEMENTO PATTERN',CLASS=A,MSGCLASS=X
  //* CREATE A SNAPSHOT BEFORE DANGEROUS ALCHEMY
  //BACKUP   EXEC PGM=IEBCOPY
  //SYSPRINT DD SYSOUT=*
  //SYSUT1   DD DSN=TEKROM.CRITICAL.PDS,DISP=SHR
  //SYSUT2   DD DSN=TEKROM.CRITICAL.PDS.BACKUP,
  //            DISP=(NEW,CATLG,DELETE),SPACE=(CYL,(5,5,10))
  //SYSIN    DD *
    COPY INDD=SYSUT1,OUTDD=SYSUT2
  /*
  //*
  //* PROCEED WITH THE RITUAL, SAFE IN KNOWLEDGE OF RECOVERY
  //UPDATE   EXEC PGM=DANGERPG
  //TARGET   DD DSN=TEKROM.CRITICAL.PDS,DISP=OLD
tags: [memento, jcl, backup, iebcopy]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
## The Memento

The mainframe is unforgiving; a miscast spell can obliterate millions of records. The Memento pattern is the sacred art of the backup. By utilizing utilities like `IEBCOPY`, a techno-mage creates a perfect chronological memento of a Partitioned Data Set (PDS) before applying a destructive update. If the subsequent `DANGERPG` ritual fails, the state can be effortlessly restored from the memento dataset.
