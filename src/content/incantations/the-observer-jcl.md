---
title: The Observer
description: Define a one-to-many dependency so that when one object changes state, its dependents are notified.
type: jcl
gofPattern: Observer
gofCategory: Behavioral
arcaneSchool: "Enchantment // Job Control Wards"
formula: |2
  //OBSERVER JOB (ACCT),'OBSERVER PATTERN',CLASS=A,MSGCLASS=X,
  //         NOTIFY=&SYSUID
  //* THE SYSTEM OBSERVES THE JOB AND NOTIFIES THE CASTER
  //*
  //STEP1    EXEC PGM=MAINTASK
  //*
  //* EXPLICIT OBSERVER STEP FOR ABENDS
  //IFABEND  IF ABEND THEN
  //NOTIFY   EXEC PGM=IEBGENER
  //SYSPRINT DD SYSOUT=*
  //SYSUT1   DD *
    HEAR YE: THE MAINTASK HAS FALLEN INTO CHAOS.
  /*
  //SYSUT2   DD SYSOUT=A,DEST=OPCENTER
  //SYSIN    DD DUMMY
  //         ENDIF
tags: [observer, jcl, notify, if-abend]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
## The Observer

In the Job Entry Subsystem (JES), the Observer pattern is embedded directly in the `JOB` card via the `NOTIFY=` parameter, guaranteeing the casting mage receives an astral ping when the job concludes. For more granular observation, an `IF ABEND` construct watches the execution state. If the core steps suffer a critical failure, this observer block awakens, transmitting an emergency broadcast to the operations center.
