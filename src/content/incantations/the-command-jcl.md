---
title: The Command
description: Encapsulate a request as an object, allowing parameterization of clients.
type: jcl
gofPattern: Command
gofCategory: Behavioral
arcaneSchool: "Enchantment // Job Control Wards"
formula: |2
  //COMMAND  JOB (ACCT),'COMMAND PATTERN',CLASS=A,MSGCLASS=X
  //* THE IDCAMS UTILITY ACTS AS THE INVOKER
  //* THE SYSIN CONTAINS THE ENCAPSULATED COMMANDS
  //STEP1    EXEC PGM=IDCAMS
  //SYSPRINT DD SYSOUT=*
  //SYSIN    DD *
    DEFINE CLUSTER (NAME(TEKROM.NEW.CLUSTER) -
                    VOLUMES(VOL001) -
                    CYLINDERS(5 1) -
                    RECORDSIZE(80 80) -
                    INDEXED -
                    KEYS(10 0)) -
           DATA (NAME(TEKROM.NEW.CLUSTER.DATA)) -
           INDEX (NAME(TEKROM.NEW.CLUSTER.INDEX))
  /*
tags: [command, jcl, idcams, sysin]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
## The Command

In the esoteric syntax of Job Control, the Command pattern is actualized through `SYSIN` streams fed to utility processors like `IDCAMS`. The JCL step merely invokes the utility (the Invoker), while the actual arcane commands—such as defining a VSAM cluster—are encapsulated as plain text data within the `SYSIN` DD statement. This encapsulates the operation, separating the invocation mechanism from the precise magical instructions.
