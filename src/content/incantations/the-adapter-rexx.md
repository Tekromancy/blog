---
title: Adapter to the Ancients
description: Translate legacy VSAM access methods to modern DB2 query structures.
type: rexx
gofPattern: Adapter
gofCategory: Structural
arcaneSchool: "Transmutation // Alteration"
formula: |2
  /* ooRexx Adapter */
  ::class VSAMTarget
  ::method readRecord
    say "Reading VSAM record..."

  ::class DB2Adaptee
  ::method executeQuery
    say "Executing SQL query on DB2..."

  ::class VSAMtoDB2Adapter subclass VSAMTarget
  ::attribute db2
  ::method init
    self~db2 = .DB2Adaptee~new()
  ::method readRecord
    self~db2~executeQuery()
tags: [adapter, vsam, db2, rexx]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
Bridging the gap between the ancient VSAM scrolls and the structured DB2 relational grids, the Adapter transcribes queries in real time.
