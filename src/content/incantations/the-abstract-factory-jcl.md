---
title: The Abstract Factory
description: Materialize families of related job control wards without specifying their concrete incantations.
type: jcl
gofPattern: Abstract Factory
gofCategory: Creational
arcaneSchool: "Conjuration // Job Control Wards"
formula: |2
  //ABSFACT  JOB (ACCT),'ABSTRACT FACTORY',CLASS=A,MSGCLASS=X
  //* WARD PARMETERS DEFINE THE FAMILY
  //         SET ENV='PROD'
  //         SET DB='DB2'
  //*
  //         JCLLIB ORDER=(TEKROM.WARDS.PROCLIB)
  //*
  //STEP01   EXEC PROC=FACTORY,ENV=&ENV,DB=&DB
  //SYSIN    DD DSN=TEKROM.INCANT.INPUT(DATA1),DISP=SHR
tags: [abstract-factory, jcl, proc, wards]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---
## The Abstract Factory

In the deep mainframe sanctums, the Abstract Factory ward allows a techno-mage to summon a cohesive suite of environmental parameters and datasets. By passing high-level sigils like `ENV` or `DB`, the underlying procedure (PROC) binds the appropriate concrete resources, keeping the outer ritual pure and unburdened by mundane specifics.
