---
title: "The Composite Pattern in ALGOL"
description: "Structured antiquity and the Composite pattern."
type: algol
gofPattern: Composite
gofCategory: Structural
arcaneSchool: "Illusion // Fractals"
formula: |2
  CO Composite in ALGOL 68 CO
  BEGIN
    MODE COMPOSITE = STRUCT (PROC VOID operation);
    PROC cast = (COMPOSITE c) VOID :
      (operation OF c);
    COMPOSITE c := (VOID: print(("Composite manifested", new line)));
    cast(c)
  END
tags: ["algol", "the-first-scrolls", "gof"]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
# The Composite

In the neon-lit depths of the ancient mainframes, the First Scrolls whisper of the **Composite**. ALGOL 68, the progenitor of structured logic, enforces a strict, archaic beauty. We wield its `MODE` and `PROC` constructs to bind this Structural concept into reality.

## The Arcane Mechanism
By defining rigid structures and precise procedures, the Composite avoids the chaotic spaghetti of unstructured pasts. The rigid `BEGIN` and `END` form a protective ward around our logic, ensuring the ritual compiles with absolute certainty.
