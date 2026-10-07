---
title: "Decorator: The Layered Ward"
description: "Attach additional responsibilities to an RPG object dynamically."
type: rpg
gofPattern: Decorator
gofCategory: Structural
arcaneSchool: "Abjuration // Shield"
formula: |2
  **FREE
  Ctl-Opt NoMain;

  Dcl-Ds Rune_t Qualified Template;
    ExecutePtr Pointer(*Proc);
    BaseRune Pointer; // Pointer to the wrapped Rune
  End-Ds;

  Dcl-Pr ExecBase ExtProc(Base.ExecutePtr);
  End-Pr;

  Dcl-Proc DecoratorRune Export;
    Dcl-Pi *N;
      pWrappedRune Pointer Value;
    End-Pi;

    Dcl-Ds Base Likeds(Rune_t) Based(pWrappedRune);

    // Add additional logging magic before invocation
    Dsply 'Invoking inner Ward...';

    // Call the inner rune
    ExecBase();
  End-Proc;
tags: [structural, ibm-i, runes, decorator]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

# Decorator

Often, modifying a stable Service Program is risky. The Decorator pattern in RPGLE allows adding new behaviors (like audit logging or authorization checks) by wrapping the original procedure pointer with a layered Ward.
