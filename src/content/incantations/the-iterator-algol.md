---
title: "The Iterator Pattern in ALGOL"
description: "Structured antiquity and the Iterator pattern."
type: algol
gofPattern: Iterator
gofCategory: Behavioral
arcaneSchool: Divination // Sequencing
formula: |
  CO Iterator in ALGOL 68 CO
  BEGIN
    MODE ITERATOR = STRUCT (PROC VOID next);
    PROC cast = (ITERATOR i) VOID :
      (next OF i);
    ITERATOR i := (VOID: print(("Iterator manifested", new line)));
    cast(i)
  END
tags: ["algol", "the-first-scrolls", "gof"]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
# The Iterator

In the neon-lit depths of the ancient mainframes, the First Scrolls whisper of the **Iterator**. ALGOL 68, the progenitor of structured logic, enforces a strict, archaic beauty. We wield its `MODE` and `PROC` constructs to bind this Behavioral concept into reality.

## The Arcane Mechanism
By defining rigid structures and precise procedures, the Iterator avoids the chaotic spaghetti of unstructured pasts. The rigid `BEGIN` and `END` form a protective ward around our logic, ensuring the ritual compiles with absolute certainty.
