---
title: The Template Method
description: Define the skeleton of an algorithm, deferring some steps to subclasses (callers).
type: jcl
gofPattern: Template Method
gofCategory: Behavioral
arcaneSchool: "Enchantment // Job Control Wards"
formula: |2
  //TEMPLAT  JOB (ACCT),'TEMPLATE METHOD',CLASS=A,MSGCLASS=X
  //         JCLLIB ORDER=(TEKROM.WARDS.PROCLIB)
  //*
  //* THE PROC "DATAFLOW" DEFINES THE OVERALL SKELETON:
  //* EXTRACT -> TRANSFORM -> LOAD
  //* WE SUPPLY THE SPECIFIC "TRANSFORM" RULES
  //RUNJOB   EXEC PROC=DATAFLOW
  //TRANS.SYSIN DD *
    REPLACE MAGIC_WORD='OPEN_SESAME'
  /*
tags: [template-method, jcl, proc, skeletal-logic]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
## The Template Method

The cataloged procedure (PROC) is the ultimate realization of the Template Method in JCL. A master architect defines the immutable skeleton of a ritual—for instance, an Extract-Transform-Load (ETL) pipeline. The caller executes the template but is required to provide the specific incantations for the transformation step via `DD` overrides. The structure is fixed, but the specific tactical steps are deferred to the invoking script.
