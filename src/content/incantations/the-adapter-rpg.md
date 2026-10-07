---
title: "Adapter: Legacy Fixed-Format Bridge"
description: "Convert the interface of an ancient Ward into another interface clients expect."
type: rpg
gofPattern: Adapter
gofCategory: Structural
arcaneSchool: "Transmutation // Alteration"
formula: |2
  **FREE
  Ctl-Opt NoMain;

  // The ancient fixed-format subprocedure wrapper
  Dcl-Pr OldWardRune ExtProc('OLDWARD');
    Par1 Char(10);
    Par2 Zoned(5:0);
  End-Pr;

  // The new free-format adapter interface
  Dcl-Proc ModernWardAdapter Export;
    Dcl-Pi *N Ind;
      InputString Char(20) Const;
    End-Pi;

    Dcl-S p1 Char(10);
    Dcl-S p2 Zoned(5:0);

    p1 = %Subst(InputString: 1: 10);
    p2 = %Dec(%Subst(InputString: 11: 5): 5: 0);

    // Call the legacy rune
    OldWardRune(p1: p2);
    Return *On;
  End-Proc;
tags: [structural, ibm-i, runes, adapter]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

# Adapter

In the transition from RPG III / Fixed-Format to modern Free-Format spells, the Adapter pattern acts as a Rosetta Stone. It wraps the archaic fixed-format Wards in a safe, modern Business Logic Rune interface, allowing new systems to interoperate with the old magic safely.
