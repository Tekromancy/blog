---
title: "The Adapter Pattern in ALGOL"
description: "Structured antiquity and the Adapter pattern."
type: algol
gofPattern: Adapter
gofCategory: Structural
arcaneSchool: "Transmutation // Morphing"
formula: |2
  CO Adapter in ALGOL 68 CO
  BEGIN
    MODE TARGET = STRUCT (PROC VOID request);
    PROC cast = (TARGET t) VOID :
      (request OF t);
    TARGET t := (VOID: print(("Adapter manifested", new line)));
    cast(t)
  END
tags: ["algol", "the-first-scrolls", "gof"]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
# The Adapter

In the neon-lit depths of the ancient mainframes, the First Scrolls whisper of the **Adapter**. ALGOL 68, the progenitor of structured logic, enforces a strict, archaic beauty. We wield its `MODE` and `PROC` constructs to bind this Structural concept into reality.

## The Arcane Mechanism
By defining rigid structures and precise procedures, the Adapter avoids the chaotic spaghetti of unstructured pasts. The rigid `BEGIN` and `END` form a protective ward around our logic, ensuring the ritual compiles with absolute certainty.
