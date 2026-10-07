---
title: "The Command Pattern in ALGOL"
description: "Structured antiquity and the Command pattern."
type: algol
gofPattern: Command
gofCategory: Behavioral
arcaneSchool: Enchantment // Imperative
formula: |
  CO Command in ALGOL 68 CO
  BEGIN
    MODE COMMAND = STRUCT (PROC VOID execute);
    PROC cast = (COMMAND c) VOID :
      (execute OF c);
    COMMAND c := (VOID: print(("Command manifested", new line)));
    cast(c)
  END
tags: ["algol", "the-first-scrolls", "gof"]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
# The Command

In the neon-lit depths of the ancient mainframes, the First Scrolls whisper of the **Command**. ALGOL 68, the progenitor of structured logic, enforces a strict, archaic beauty. We wield its `MODE` and `PROC` constructs to bind this Behavioral concept into reality.

## The Arcane Mechanism
By defining rigid structures and precise procedures, the Command avoids the chaotic spaghetti of unstructured pasts. The rigid `BEGIN` and `END` form a protective ward around our logic, ensuring the ritual compiles with absolute certainty.
