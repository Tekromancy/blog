---
title: "The Proxy Pattern in ALGOL"
description: "Structured antiquity and the Proxy pattern."
type: algol
gofPattern: Proxy
gofCategory: Structural
arcaneSchool: "Illusion // Simulacrum"
formula: |2
  CO Proxy in ALGOL 68 CO
  BEGIN
    MODE PROXY = STRUCT (PROC VOID request);
    PROC cast = (PROXY p) VOID :
      (request OF p);
    PROXY p := (VOID: print(("Proxy manifested", new line)));
    cast(p)
  END
tags: ["algol", "the-first-scrolls", "gof"]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
# The Proxy

In the neon-lit depths of the ancient mainframes, the First Scrolls whisper of the **Proxy**. ALGOL 68, the progenitor of structured logic, enforces a strict, archaic beauty. We wield its `MODE` and `PROC` constructs to bind this Structural concept into reality.

## The Arcane Mechanism
By defining rigid structures and precise procedures, the Proxy avoids the chaotic spaghetti of unstructured pasts. The rigid `BEGIN` and `END` form a protective ward around our logic, ensuring the ritual compiles with absolute certainty.
