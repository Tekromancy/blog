---
title: "The Mediator Pattern in ALGOL"
description: "Structured antiquity and the Mediator pattern."
type: algol
gofPattern: Mediator
gofCategory: Behavioral
arcaneSchool: "Enchantment // Harmony"
formula: |2
  CO Mediator in ALGOL 68 CO
  BEGIN
    MODE MEDIATOR = STRUCT (PROC VOID mediate);
    PROC cast = (MEDIATOR m) VOID :
      (mediate OF m);
    MEDIATOR m := (VOID: print(("Mediator manifested", new line)));
    cast(m)
  END
tags: ["algol", "the-first-scrolls", "gof"]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---
# The Mediator

In the neon-lit depths of the ancient mainframes, the First Scrolls whisper of the **Mediator**. ALGOL 68, the progenitor of structured logic, enforces a strict, archaic beauty. We wield its `MODE` and `PROC` constructs to bind this Behavioral concept into reality.

## The Arcane Mechanism
By defining rigid structures and precise procedures, the Mediator avoids the chaotic spaghetti of unstructured pasts. The rigid `BEGIN` and `END` form a protective ward around our logic, ensuring the ritual compiles with absolute certainty.
