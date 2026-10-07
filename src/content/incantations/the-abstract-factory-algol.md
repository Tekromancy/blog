---
title: "The Abstract Factory Pattern in ALGOL"
description: "Structured antiquity and the Abstract Factory pattern."
type: algol
gofPattern: Abstract Factory
gofCategory: Creational
arcaneSchool: Conjuration // Forge
formula: |
  CO Abstract Factory in ALGOL 68 CO
  BEGIN
    MODE FACTORY = STRUCT (PROC VOID create);
    PROC cast = (FACTORY f) VOID :
      (create OF f);
    FACTORY f := (VOID: print(("Abstract Factory manifested", new line)));
    cast(f)
  END
tags: ["algol", "the-first-scrolls", "gof"]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---
# The Abstract Factory

In the neon-lit depths of the ancient mainframes, the First Scrolls whisper of the **Abstract Factory**. ALGOL 68, the progenitor of structured logic, enforces a strict, archaic beauty. We wield its `MODE` and `PROC` constructs to bind this Creational concept into reality.

## The Arcane Mechanism
By defining rigid structures and precise procedures, the Abstract Factory avoids the chaotic spaghetti of unstructured pasts. The rigid `BEGIN` and `END` form a protective ward around our logic, ensuring the ritual compiles with absolute certainty.
