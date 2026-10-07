---
title: Factory Method (Forth)
description: Defer creation to the defining words of the Necromancer.
type: forth
gofPattern: Factory Method
gofCategory: Creational
arcaneSchool: "Conjuration // Runesmithing"
formula: |2
  \ Runesmithing: The Factory Method
  \ We use CREATE ... DOES> to spawn customized words (entities).

  : DAEMON-SPAWNER ( power "name" -- )
    CREATE ,             \ Store power level in dictionary
    DOES> @              \ When called, fetch power level
    ." Daemon unleashed with power: " . CR ;

  \ Factory instantiation:
  10 DAEMON-SPAWNER LESSER-DAEMON
  50 DAEMON-SPAWNER GREATER-DAEMON

  \ Usage:
  \ LESSER-DAEMON
  \ GREATER-DAEMON
tags: [creational, factory-method, forth, runesmithing]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

In Forth, the Factory Method is seamlessly handled by `CREATE ... DOES>`. The parent word acts as the factory, stamping out child words imbued with specific runtime behaviors and sealed data.
