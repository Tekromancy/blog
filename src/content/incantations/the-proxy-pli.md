---
title: The Proxy
description: Provide a surrogate or placeholder for another PL/I module to control access to it.
type: pli
gofPattern: Proxy
gofCategory: Structural
arcaneSchool: "Abjuration // Access"
formula: |2
  /* The Proxy */
  PROXY: PROC OPTIONS(MAIN);
     DCL REAL_SUBJECT ENTRY;
     DCL HAS_ACCESS BIT(1) INITIAL('1'B);

     PROXY_SUBJECT: PROC;
        IF HAS_ACCESS THEN
           CALL REAL_SUBJECT();
        ELSE
           PUT SKIP LIST('Access Denied to Mainframe Core.');
     END PROXY_SUBJECT;
  END PROXY;
tags: [proxy, placeholder, control]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

A Proxy acts as a gatekeeper, verifying security credentials or delaying the loading of an expensive monolithic resource until it's actually requested.
