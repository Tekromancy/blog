---
title: The Mediator
description: Define an object that encapsulates how a set of objects interact.
type: jcl
gofPattern: Mediator
gofCategory: Behavioral
arcaneSchool: "Enchantment // Job Control Wards"
formula: |2
  //MEDIATOR JOB (ACCT),'MEDIATOR PATTERN',CLASS=A,MSGCLASS=X
  //* TEMPORARY DATASET ACTS AS THE MEDIATOR BETWEEN STEPS
  //STEP1    EXEC PGM=PRODUCER
  //OUTPUT   DD DSN=&&COMMSTREAM,DISP=(NEW,PASS),
  //            SPACE=(CYL,(1,1)),UNIT=SYSDA
  //*
  //STEP2    EXEC PGM=CONSUMER
  //INPUT    DD DSN=&&COMMSTREAM,DISP=(OLD,DELETE)
tags: [mediator, jcl, temp-datasets, pass]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
## The Mediator

Job steps in JCL operate in isolation; they do not share memory or invoke one another directly. To enable interaction, the Mediator pattern takes the form of temporary, passed datasets (`&&COMMSTREAM`). The `PRODUCER` step writes its arcane manifestations to this mediator. The operating system holds the dataset in a liminal state via `DISP=(NEW,PASS)`, allowing the `CONSUMER` step to read and ultimately dissolve it, mediating the flow of data without direct coupling.
