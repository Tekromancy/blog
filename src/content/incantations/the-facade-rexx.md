---
title: The Subsystem Facade
description: Provide a simplified interface to complex CICS subsystem initialization.
type: rexx
gofPattern: Facade
gofCategory: Structural
arcaneSchool: "Abjuration // Shielding"
formula: |2
  /* ooRexx Facade */
  ::class CICSFacade
  ::method startSubsystem
    storage = .StorageMgr~new()
    task = .TaskMgr~new()
    storage~allocate()
    task~initDispatch()
    say "CICS Subsystem ready."

  ::class StorageMgr
  ::method allocate
    say "Allocating DSA..."

  ::class TaskMgr
  ::method initDispatch
    say "Initializing task dispatcher..."
tags: [facade, cics, rexx]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
To invoke the dark complexity of CICS requires merely a single command through the Facade, hiding the terrifying inner workings of storage and task management.
