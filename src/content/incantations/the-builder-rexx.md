---
title: The Builder of JCL
description: Step-by-step construction of complex mainframe jobs.
type: rexx
gofPattern: Builder
gofCategory: Creational
arcaneSchool: "Transmutation // Structuring"
formula: |2
  /* ooRexx Builder */
  ::class JCLBuilder
  ::attribute jcl
  ::method init
    self~jcl = ''
  ::method addJobCard
    self~jcl = self~jcl || "//JOB1 JOB (ACCT),'BUILD',CLASS=A" || '0a'x
  ::method addStep
    use arg program
    self~jcl = self~jcl || "//STEP1 EXEC PGM="||program || '0a'x
  ::method getResult
    return self~jcl
tags: [builder, jcl, rexx]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
Assembling a JCL spell requires precise syntax. The Builder ensures each card is punched exactly when needed.
