---
title: The Facade
description: Provide a unified interface to a complex set of job steps in a mainframe subsystem.
type: jcl
gofPattern: Facade
gofCategory: Structural
arcaneSchool: "Transmutation // Job Control Wards"
formula: |2
  //FACADE   JOB (ACCT),'FACADE PATTERN',CLASS=A,MSGCLASS=X
  //         JCLLIB ORDER=(TEKROM.WARDS.PROCLIB)
  //*
  //* A SINGLE PROC INVOCATION HIDES 50 COMPLEX STEPS
  //NIGHTLY  EXEC PROC=EOYCLOSE,
  //         YEAR='2026',
  //         LEDGER='TEKROM.GL.MASTER'
tags: [facade, jcl, proc, abstraction]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
## The Facade

Mainframe end-of-year processing involves a terrifying labyrinth of data extractions, sorting algorithms, and archival wards. The Facade pattern tames this complexity. By encapsulating dozens of job steps, temporary datasets, and utility calls into a single majestic `PROC`, the executing mage needs only invoke the `EOYCLOSE` facade. The underlying chaos is shielded from view, presenting a clean, unified interface.
