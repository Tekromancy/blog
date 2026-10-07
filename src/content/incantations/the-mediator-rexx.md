---
title: The Pentagram Mediator
description: Coordinate between IMS, CICS, and DB2 without tight coupling.
type: rexx
gofPattern: Mediator
gofCategory: Behavioral
arcaneSchool: "Enchantment // Compulsion"
formula: |2
  /* ooRexx Mediator */
  ::class SystemMediator
  ::attribute cics
  ::attribute db2
  ::method notify
    use arg sender, event
    if event = 'CICS_READY' then self~db2~prepare()

  ::class Subsystem abstract
  ::attribute mediator
  ::method init
    use arg med
    self~mediator = med

  ::class CICS subclass Subsystem
  ::method start
    self~mediator~notify(self, 'CICS_READY')
tags: [mediator, cics, db2, rexx]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---
The Mediator sits in the center of the subsystem pentagram, ensuring that CICS and DB2 coordinate their initializations without knowing the true names of one another.
