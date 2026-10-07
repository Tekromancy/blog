---
title: The Bridge Incantation
description: Decoupling a spell's abstraction from its elemental implementation.
type: mathematica
gofPattern: Bridge
gofCategory: Structural
arcaneSchool: "Transmutation // Abstraction"
formula: |2
  (* The Implementations (Elements) *)
  FireElement[damage_] := "burns for " <> ToString[damage] <> " fire damage";
  IceElement[damage_] := "freezes, causing " <> ToString[damage] <> " frost damage";

  (* The Abstractions (Spells) *)
  BlastSpell[element_, baseDamage_] := 
    "A chaotic blast that " <> element[baseDamage * 2];

  WaveSpell[element_, baseDamage_] := 
    "A cascading wave that " <> element[baseDamage];

  (* Usage *)
  Print[BlastSpell[FireElement, 10]];
  Print[WaveSpell[IceElement, 15]];
tags: [bridge, decoupling, structural, functions]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
