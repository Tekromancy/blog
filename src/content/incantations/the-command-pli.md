---
title: The Command
description: Encapsulate a request as an object, thereby letting you parameterize clients with different requests.
type: pli
gofPattern: Command
gofCategory: Behavioral
arcaneSchool: "Enchantment // Command"
formula: |2
  /* The Command */
  COMMAND: PROC OPTIONS(MAIN);
     DCL 1 CMD BASED(C_PTR),
           2 EXECUTE ENTRY,
           2 UNDO ENTRY;
     PUT SKIP LIST('Command queued for batch processing.');
  END COMMAND;
tags: [command, batch, encapsulation]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Command pattern shines in PL/I batch processing, where tasks are encapsulated in structures holding function pointers and state for deferred execution.
