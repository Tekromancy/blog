---
title: The Facade
description: Provide a unified interface to a set of interfaces in the monolithic subsystem.
type: pli
gofPattern: Facade
gofCategory: Structural
arcaneSchool: "Illusion // Monolith"
formula: |2
  /* The Facade */
  FACADE: PROC OPTIONS(MAIN);
     DCL INIT_SYS ENTRY;
     DCL RUN_SYS ENTRY;
     DCL SHUTDOWN_SYS ENTRY;

     DO_EVERYTHING: PROC;
        CALL INIT_SYS();
        CALL RUN_SYS();
        CALL SHUTDOWN_SYS();
     END DO_EVERYTHING;
  END FACADE;
tags: [facade, unified, interface]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

The Facade simplifies the vast IBM Arcana of a subsystem into a single, highly cohesive procedure call.
