---
title: The State
description: Allow a mainframe monolith to alter its behavior when its internal state changes.
type: pli
gofPattern: State
gofCategory: Behavioral
arcaneSchool: "Transmutation // Behavior"
formula: |2
  /* The State */
  STATE: PROC OPTIONS(MAIN);
     DCL 1 STATE_MACHINE BASED(S_PTR),
           2 HANDLE ENTRY(POINTER);
     PUT SKIP LIST('State transition engaged.');
  END STATE;
tags: [state, transition, behavior]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The State pattern dynamically swaps function pointers in a context structure, reflecting the changing state of the IBM job execution.
