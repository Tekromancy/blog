---
title: The Chain of Responsibility
description: Avoid coupling the sender of a request to its receiver by giving more than one module a chance to handle the request.
type: pli
gofPattern: Chain of Responsibility
gofCategory: Behavioral
arcaneSchool: "Enchantment // Delegation"
formula: |2
  /* The Chain of Responsibility */
  CHAIN: PROC OPTIONS(MAIN);
     DCL 1 HANDLER BASED(H_PTR),
           2 NEXT_HANDLER POINTER,
           2 HANDLE_REQ ENTRY(FIXED BIN(15));
     PUT SKIP LIST('Passing request down the handler chain...');
  END CHAIN;
tags: [chain, responsibility, handler]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

By forming a linked list of handler pointers, the mainframe passes the request sequentially until a procedure successfully executes the command.
