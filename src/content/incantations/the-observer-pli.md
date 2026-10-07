---
title: The Observer
description: Define a one-to-many dependency between objects so that when one changes state, all its dependents are notified and updated automatically.
type: pli
gofPattern: Observer
gofCategory: Behavioral
arcaneSchool: "Divination // Notification"
formula: |2
  /* The Observer */
  OBSERVER: PROC OPTIONS(MAIN);
     DCL 1 OBS BASED(O_PTR),
           2 UPDATE ENTRY(POINTER);
     PUT SKIP LIST('Notifying registered observers of state change...');
  END OBSERVER;
tags: [observer, event, notify]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

Using arrays of pointers to observer structures, the mainframe broadcasts events without tight coupling to the listeners.
