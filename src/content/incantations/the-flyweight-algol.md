---
title: "The Flyweight Pattern in ALGOL"
description: "Structured antiquity and the Flyweight pattern."
type: algol
gofPattern: Flyweight
gofCategory: Structural
arcaneSchool: "Abjuration // Compression"
formula: |2
  CO Flyweight in ALGOL 68 CO
  BEGIN
    MODE FLYWEIGHT = STRUCT (PROC VOID operation);
    PROC cast = (FLYWEIGHT f) VOID :
      (operation OF f);
    FLYWEIGHT f := (VOID: print(("Flyweight manifested", new line)));
    cast(f)
  END
tags: ["algol", "the-first-scrolls", "gof"]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---
# The Flyweight

In the neon-lit depths of the ancient mainframes, the First Scrolls whisper of the **Flyweight**. ALGOL 68, the progenitor of structured logic, enforces a strict, archaic beauty. We wield its `MODE` and `PROC` constructs to bind this Structural concept into reality.

## The Arcane Mechanism
By defining rigid structures and precise procedures, the Flyweight avoids the chaotic spaghetti of unstructured pasts. The rigid `BEGIN` and `END` form a protective ward around our logic, ensuring the ritual compiles with absolute certainty.
