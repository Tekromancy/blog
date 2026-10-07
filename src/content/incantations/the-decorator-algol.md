---
title: "The Decorator Pattern in ALGOL"
description: "Structured antiquity and the Decorator pattern."
type: algol
gofPattern: Decorator
gofCategory: Structural
arcaneSchool: Enchantment // Layering
formula: |
  CO Decorator in ALGOL 68 CO
  BEGIN
    MODE DECORATOR = STRUCT (PROC VOID operation);
    PROC cast = (DECORATOR d) VOID :
      (operation OF d);
    DECORATOR d := (VOID: print(("Decorator manifested", new line)));
    cast(d)
  END
tags: ["algol", "the-first-scrolls", "gof"]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
# The Decorator

In the neon-lit depths of the ancient mainframes, the First Scrolls whisper of the **Decorator**. ALGOL 68, the progenitor of structured logic, enforces a strict, archaic beauty. We wield its `MODE` and `PROC` constructs to bind this Structural concept into reality.

## The Arcane Mechanism
By defining rigid structures and precise procedures, the Decorator avoids the chaotic spaghetti of unstructured pasts. The rigid `BEGIN` and `END` form a protective ward around our logic, ensuring the ritual compiles with absolute certainty.
