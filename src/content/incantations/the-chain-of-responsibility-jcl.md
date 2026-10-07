---
title: The Chain of Responsibility
description: Pass a request along a chain of job steps until one handles it.
type: jcl
gofPattern: Chain of Responsibility
gofCategory: Behavioral
arcaneSchool: "Enchantment // Job Control Wards"
formula: |2
  //CHAIN    JOB (ACCT),'CHAIN RESPONSIBILITY',CLASS=A,MSGCLASS=X
  //* STEP1 ATTEMPTS PRIMARY RESOLUTION
  //STEP1    EXEC PGM=ATTEMPT1
  //* STEP2 RUNS ONLY IF STEP1 FAILED (RC > 4)
  //STEP2    EXEC PGM=ATTEMPT2,COND=(4,GE,STEP1)
  //* STEP3 RUNS ONLY IF STEP2 FAILED
  //STEP3    EXEC PGM=ATTEMPT3,COND=(4,GE,STEP2)
  //* FINAL FALLBACK
  //STEP4    EXEC PGM=FALLBACK,COND=(4,GE,STEP3)
tags: [chain-of-responsibility, jcl, cond-parameter, error-handling]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
## The Chain of Responsibility

Mainframes thrive on resilience. The Chain of Responsibility pattern is woven into JCL via the `COND=` ward. By examining the return codes (RC) of previous steps, the execution stream can cascade down a chain of fallback programs. If `STEP1` fails to bind the necessary energies, the conditional logic passes the responsibility to `STEP2`, and so on, until the anomaly is handled or the chain reaches an ultimate fallback.
