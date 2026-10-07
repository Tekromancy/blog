---
title: The Memento
description: Without violating encapsulation, capture and externalize a mainframe's internal state so that it can be restored later.
type: pli
gofPattern: Memento
gofCategory: Behavioral
arcaneSchool: "Chronomancy // State"
formula: |2
  /* The Memento */
  MEMENTO: PROC OPTIONS(MAIN);
     DCL 1 STATE_SNAP BASED(S_PTR),
           2 DUMP CHAR(1024);
     PUT SKIP LIST('Core dump generated for Memento restoration.');
  END MEMENTO;
tags: [memento, core-dump, state]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Memento pattern captures a core dump of vital structures in PL/I, allowing rollback to a stable checkpoint in case of aborts.
