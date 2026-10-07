---
title: "Bridge: The Cross-Platform Rune"
description: "Decouple an abstraction from its implementation so that the two can vary independently."
type: rpg
gofPattern: Bridge
gofCategory: Structural
arcaneSchool: "Transmutation // Artifice"
formula: |2
  **FREE
  Ctl-Opt NoMain;

  Dcl-Ds Implementor_t Qualified Template;
    ExecuteProc Pointer(*Proc);
  End-Ds;

  Dcl-Proc ExecuteAbstraction Export;
    Dcl-Pi *N;
      pImplementor Pointer Value;
    End-Pi;

    Dcl-Ds Impl Likeds(Implementor_t) Based(pImplementor);
    Dcl-Pr RunImpl ExtProc(Impl.ExecuteProc);
    End-Pr;

    // Abstraction logic
    RunImpl();
  End-Proc;
tags: [structural, ibm-i, runes, bridge]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---

# Bridge

Through the manipulation of procedure pointers on the iSeries, the Bridge pattern decouples the high-level Business Logic from the low-level DB2 or IFS manipulation spells, allowing independent evolution of both abstractions and implementations.
