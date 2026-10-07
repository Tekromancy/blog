---
title: The Proxy
description: Provide a surrogate or placeholder for another dataset to control access to it.
type: jcl
gofPattern: Proxy
gofCategory: Structural
arcaneSchool: "Transmutation // Job Control Wards"
formula: |2
  //PROXY    JOB (ACCT),'PROXY PATTERN',CLASS=A,MSGCLASS=X
  //* USING AN ALIAS AS A PROXY TO THE REAL SECURE DATASET
  //STEP1    EXEC PGM=DATAREAD
  //SECURE   DD DSN=TEKROM.SECURE.DATA.ALIAS,DISP=SHR
  //*
  //* OR USING DUMMY TO STUB OUT A PROXY IN DEV
  //DEVSTEP  EXEC PGM=DATAREAD
  //SECURE   DD DUMMY
tags: [proxy, jcl, alias, dd-dummy]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
## The Proxy

In the dark sectors of the mainframe, some data structures require strict access control or delayed instantiation. The Proxy pattern handles this via dataset Aliases or `DD DUMMY`. An alias acts as a symbolic link—a proxy—directing the ward to the true, securely vaulted dataset. In lower-tier testing zones, `DD DUMMY` serves as a hollow proxy, allowing the program to execute gracefully without fetching the real artifact.
