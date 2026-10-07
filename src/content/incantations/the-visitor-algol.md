---
title: "The Visitor Pattern in ALGOL"
description: "Structured antiquity and the Visitor pattern."
type: algol
gofPattern: Visitor
gofCategory: Behavioral
arcaneSchool: Conjuration // Roaming
formula: |
  CO Visitor in ALGOL 68 CO
  BEGIN
    MODE VISITOR = STRUCT (PROC VOID visit);
    PROC cast = (VISITOR v) VOID :
      (visit OF v);
    VISITOR v := (VOID: print(("Visitor manifested", new line)));
    cast(v)
  END
tags: ["algol", "the-first-scrolls", "gof"]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---
# The Visitor

In the neon-lit depths of the ancient mainframes, the First Scrolls whisper of the **Visitor**. ALGOL 68, the progenitor of structured logic, enforces a strict, archaic beauty. We wield its `MODE` and `PROC` constructs to bind this Behavioral concept into reality.

## The Arcane Mechanism
By defining rigid structures and precise procedures, the Visitor avoids the chaotic spaghetti of unstructured pasts. The rigid `BEGIN` and `END` form a protective ward around our logic, ensuring the ritual compiles with absolute certainty.
