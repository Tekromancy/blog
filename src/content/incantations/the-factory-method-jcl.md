---
title: The Factory Method
description: Defer the instantiation of a specific utility ward to runtime conditions.
type: jcl
gofPattern: Factory Method
gofCategory: Creational
arcaneSchool: "Conjuration // Job Control Wards"
formula: |2
  //FACTMETH JOB (ACCT),'FACTORY METHOD',CLASS=A,MSGCLASS=X
  //         SET UTIL='SORT'
  //*
  //IF1      IF '&UTIL' = 'SORT' THEN
  //STEPSORT EXEC PGM=SORT
  //SYSOUT   DD SYSOUT=*
  //SORTIN   DD DSN=TEKROM.RAW.MANA,DISP=SHR
  //SORTOUT  DD DSN=TEKROM.REFINED.MANA,DISP=(NEW,CATLG,DELETE)
  //SYSIN    DD *
    SORT FIELDS=(1,10,CH,A)
  /*
  //         ENDIF
  //*
  //IF2      IF '&UTIL' = 'COPY' THEN
  //STEPCOPY EXEC PGM=IEBGENER
  //SYSPRINT DD SYSOUT=*
  //SYSUT1   DD DSN=TEKROM.RAW.MANA,DISP=SHR
  //SYSUT2   DD DSN=TEKROM.REFINED.MANA,DISP=(NEW,CATLG,DELETE)
  //SYSIN    DD DUMMY
  //         ENDIF
tags: [factory-method, jcl, if-then-else, symbols]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
## The Factory Method

In the realm of Job Control Wards, the Factory Method empowers the ritual's execution path to dynamically select the appropriate utility to perform a task. By evaluating the symbolic runes passed to the job, the mainframe's JCL interpreter decides whether to invoke the arcane `SORT` utility or the straightforward `IEBGENER` copying ritual, effectively deferring instantiation logic to the conditional construct.
