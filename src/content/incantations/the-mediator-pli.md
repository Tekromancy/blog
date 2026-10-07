---
title: The Mediator
description: Define an object that encapsulates how a set of mainframe subsystems interact.
type: pli
gofPattern: Mediator
gofCategory: Behavioral
arcaneSchool: "Enchantment // Coordination"
formula: |2
  /* The Mediator */
  MEDIATOR: PROC OPTIONS(MAIN);
     DCL NOTIFY ENTRY(POINTER, CHAR(20));
     PUT SKIP LIST('Mediating signals between core subsystems...');
  END MEDIATOR;
tags: [mediator, coordination, subsystem]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Mediator forces monolithic subsystems to communicate via a central hub, preventing a tangled web of dependencies.
