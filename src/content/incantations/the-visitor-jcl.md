---
title: The Visitor
description: Represent an operation to be performed on the elements of an object structure.
type: jcl
gofPattern: Visitor
gofCategory: Behavioral
arcaneSchool: "Enchantment // Job Control Wards"
formula: |2
  //VISITOR  JOB (ACCT),'VISITOR PATTERN',CLASS=A,MSGCLASS=X
  //* THE SUPERCE UTILITY VISITS EVERY MEMBER IN THE PDS
  //* TO SEARCH FOR A SPECIFIC ARCANE PATTERN
  //STEP1    EXEC PGM=ISRSUPC,PARM=('SRCHCMP,ANYC')
  //NEWDD    DD DSN=TEKROM.SPELL.LIBRARY,DISP=SHR
  //OUTDD    DD SYSOUT=*
  //SYSIN    DD *
    SRCHFOR  'FORBIDDEN_RUNE'
  /*
tags: [visitor, jcl, isrsupc, search]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
## The Visitor

When a vast grimoire (Partitioned Data Set) contains hundreds of distinct spells (members), altering the structure of the dataset to analyze it is prohibited. The Visitor pattern is deployed via system utilities like `ISRSUPC` (SuperC). This utility program acts as a visitor, traversing every member of the PDS without modifying its state, purely to execute a search operation for forbidden runes across the entire structural aggregate.
