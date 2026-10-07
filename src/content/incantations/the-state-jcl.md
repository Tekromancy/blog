---
title: The State
description: Allow an object to alter its behavior when its internal state changes.
type: jcl
gofPattern: State
gofCategory: Behavioral
arcaneSchool: "Enchantment // Job Control Wards"
formula: |2
  //STATE    JOB (ACCT),'STATE PATTERN',CLASS=A,RESTART=STEP2
  //* THE BEHAVIOR ALTERS BASED ON THE RESTART STATE
  //STEP1    EXEC PGM=INITPGM
  //*
  //* IF WE RESTART AT STEP2, WE ASSUME STEP1'S STATE IS COMPLETE
  //STEP2    EXEC PGM=PROCESS
  //RECOVERY DD DSN=TEKROM.STATE.CHECKPOINT,DISP=SHR
  //*
  //STEP3    EXEC PGM=FINALIZE
tags: [state, jcl, restart, checkpoints]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---
## The State

Mainframe batch jobs often process millions of transactions, demanding sophisticated state management. The State pattern is elegantly handled via checkpoint datasets and the `RESTART=` parameter. If a massive ritual is interrupted, the job's internal state dictates its behavior upon resurrection. By setting `RESTART=STEP2`, the job bypasses initialization, reading its resumed state from a checkpoint file, inherently altering its execution flow based on prior completion.
