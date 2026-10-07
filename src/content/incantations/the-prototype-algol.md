---
title: "The Prototype Pattern in ALGOL"
description: "Structured antiquity and the Prototype pattern."
type: algol
gofPattern: Prototype
gofCategory: Creational
arcaneSchool: "Illusion // Cloning"
formula: |2
  CO Prototype in ALGOL 68 CO
  BEGIN
    MODE PROTOTYPE = STRUCT (PROC VOID clone);
    PROC cast = (PROTOTYPE p) VOID :
      (clone OF p);
    PROTOTYPE p := (VOID: print(("Prototype manifested", new line)));
    cast(p)
  END
tags: ["algol", "the-first-scrolls", "gof"]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
# The Prototype

In the neon-lit depths of the ancient mainframes, the First Scrolls whisper of the **Prototype**. ALGOL 68, the progenitor of structured logic, enforces a strict, archaic beauty. We wield its `MODE` and `PROC` constructs to bind this Creational concept into reality.

## The Arcane Mechanism
By defining rigid structures and precise procedures, the Prototype avoids the chaotic spaghetti of unstructured pasts. The rigid `BEGIN` and `END` form a protective ward around our logic, ensuring the ritual compiles with absolute certainty.
