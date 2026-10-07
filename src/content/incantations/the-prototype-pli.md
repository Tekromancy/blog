---
title: The Prototype
description: Copy existing mainframe configurations using a prototypical instance rather than building from scratch.
type: pli
gofPattern: Prototype
gofCategory: Creational
arcaneSchool: "Illusion // Cloning"
formula: |2
  /* The Prototype */
  PROTOTYPE: PROC OPTIONS(MAIN);
     DCL 1 PROT BASED(P_PTR),
           2 DATA CHAR(80),
           2 CLONE ENTRY RETURNS(POINTER);
     DCL P_PTR POINTER;
     PUT SKIP LIST('Duplicating memory segments...');
  END PROTOTYPE;
tags: [prototype, clone, memory]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

By cloning an existing memory area, PL/I based variables can point to the newly allocated instance of the Prototype.
