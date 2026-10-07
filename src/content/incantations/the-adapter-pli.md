---
title: The Adapter
description: Convert the interface of an old punch card subroutine into another interface clients expect.
type: pli
gofPattern: Adapter
gofCategory: Structural
arcaneSchool: "Transmutation // Mainframe"
formula: |2
  /* The Adapter */
  ADAPTER: PROC OPTIONS(MAIN);
     DCL OLD_SYSTEM ENTRY(FIXED BIN(15));
     NEW_INTERFACE: PROC(VAL);
        DCL VAL FIXED BIN(31);
        CALL OLD_SYSTEM(VAL); /* Truncation warning expected */
     END NEW_INTERFACE;
  END ADAPTER;
tags: [adapter, interface, legacy]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

The Adapter bridges the gap between different data types and procedure signatures in archaic PL/I monoliths.
