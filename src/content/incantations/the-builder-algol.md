---
title: "The Builder Pattern in ALGOL"
description: "Structured antiquity and the Builder pattern."
type: algol
gofPattern: Builder
gofCategory: Creational
arcaneSchool: Transmutation // Assembly
formula: |
  CO Builder in ALGOL 68 CO
  BEGIN
    MODE BUILDER = STRUCT (PROC VOID build);
    PROC cast = (BUILDER b) VOID :
      (build OF b);
    BUILDER b := (VOID: print(("Builder manifested", new line)));
    cast(b)
  END
tags: ["algol", "the-first-scrolls", "gof"]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
# The Builder

In the neon-lit depths of the ancient mainframes, the First Scrolls whisper of the **Builder**. ALGOL 68, the progenitor of structured logic, enforces a strict, archaic beauty. We wield its `MODE` and `PROC` constructs to bind this Creational concept into reality.

## The Arcane Mechanism
By defining rigid structures and precise procedures, the Builder avoids the chaotic spaghetti of unstructured pasts. The rigid `BEGIN` and `END` form a protective ward around our logic, ensuring the ritual compiles with absolute certainty.
