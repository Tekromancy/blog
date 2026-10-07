---
title: The Chain of Abends
description: Pass an abend code through various handlers.
type: rexx
gofPattern: Chain of Responsibility
gofCategory: Behavioral
arcaneSchool: "Evocation // Channelling"
formula: |2
  /* ooRexx Chain of Responsibility */
  ::class Handler abstract
  ::attribute nextHandler
  ::method setNext
    use arg handler
    self~nextHandler = handler
  ::method handleRequest abstract

  ::class S0C4Handler subclass Handler
  ::method handleRequest
    use arg code
    if code = 'S0C4' then say "Handling memory protection exception."
    else if self~nextHandler \= .nil then self~nextHandler~handleRequest(code)
tags: [chain-of-responsibility, abend, rexx]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
When an ABEND occurs, the Chain of Responsibility directs the erratic energies through multiple wards until one is capable of safely grounding the exception.
