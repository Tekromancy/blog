---
title: The Flyweight
description: Use sharing to support large numbers of fine-grained jobs efficiently.
type: jcl
gofPattern: Flyweight
gofCategory: Structural
arcaneSchool: "Transmutation // Job Control Wards"
formula: |2
  //FLYWEIGH JOB (ACCT),'FLYWEIGHT PATTERN',CLASS=A,MSGCLASS=X
  //* SHARING A MASSIVE REFERENCE DATASET ACROSS STEPS
  //STEP1    EXEC PGM=ANALYZE1
  //REFDATA  DD DSN=TEKROM.MASSIVE.REFERENCE,DISP=SHR
  //*
  //STEP2    EXEC PGM=ANALYZE2
  //REFDATA  DD DSN=TEKROM.MASSIVE.REFERENCE,DISP=SHR
  //*
  //STEP3    EXEC PGM=ANALYZE3
  //REFDATA  DD DSN=TEKROM.MASSIVE.REFERENCE,DISP=SHR
tags: [flyweight, jcl, disp-shr, shared-resources]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
## The Flyweight

When multiple job steps must consult a gigantic tome of reference data, duplicating this data would waste precious mainframe DASD and memory. The Flyweight pattern is naturally invoked via the `DISP=SHR` ward. This parameter instructs the operating system to allow concurrent, read-only access to the shared dataset across multiple steps or even multiple running jobs, conserving systemic mana by sharing a single, immutable instance.
