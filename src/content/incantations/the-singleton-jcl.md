---
title: The Singleton
description: Guarantee exclusive, singular access to a vital mainframe resource.
type: jcl
gofPattern: Singleton
gofCategory: Creational
arcaneSchool: "Conjuration // Job Control Wards"
formula: |2
  //SINGLE   JOB (ACCT),'SINGLETON PATTERN',CLASS=A,MSGCLASS=X
  //* DISP=OLD ENSURES EXCLUSIVE ENQUEUE (ENQ) ON THE WARD
  //STEP1    EXEC PGM=UPDATEPG
  //STEPLIB  DD DSN=TEKROM.MYSTIC.LOADLIB,DISP=SHR
  //SINGLE   DD DSN=TEKROM.MASTER.GRIMOIRE,DISP=OLD
  //SYSIN    DD *
    APPLY_NEW_RUNE
  /*
tags: [singleton, jcl, enqueue, exclusive-access]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
## The Singleton

In the concurrent, chaotic environment of a running mainframe OS, enforcing the Singleton pattern is a matter of resource locking. The `DISP=OLD` disposition acts as a powerful ward, placing an exclusive system enqueue (ENQ) on the master dataset. This ensures that no matter how many cyber-mages submit this ritual, only one instance of the step can access and modify the grimoire at any given time.
