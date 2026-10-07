---
title: "Chain of Responsibility: The Line of Wards"
description: "Pass a request along a chain of handlers until one resolves it."
type: rpg
gofPattern: Chain of Responsibility
gofCategory: Behavioral
arcaneSchool: "Enchantment // Compulsion"
formula: |2
  **FREE
  Ctl-Opt NoMain;

  Dcl-Ds Handler_t Qualified Template;
    ProcessProc Pointer(*Proc);
    NextHandler Pointer; // Pointer to next Handler_t
  End-Ds;

  Dcl-Proc ProcessChain Export;
    Dcl-Pi *N Ind;
      pHandler Pointer Value;
      RequestData Char(50) Const;
    End-Pi;

    Dcl-Ds Handler Likeds(Handler_t) Based(pHandler);
    Dcl-Pr RunProcess Ind ExtProc(Handler.ProcessProc);
      Data Char(50) Const;
    End-Pr;

    If pHandler = *Null;
       Return *Off; // Unhandled
    EndIf;

    If RunProcess(RequestData);
       Return *On; // Handled
    Else;
       Return ProcessChain(Handler.NextHandler: RequestData);
    EndIf;
  End-Proc;
tags: [behavioral, ibm-i, runes, chain-of-responsibility]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

# Chain of Responsibility

In RPGLE, a sequence of procedure pointers linked in a Data Structure list allows requests to be passed through a chain of processing wards. If a ward cannot process the data, it defers to the next until the end of the line.
