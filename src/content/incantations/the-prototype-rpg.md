---
title: "Prototype: Memory Clone Incantation"
description: "Clone existing IBM iSeries Wards without coupling to their specific classes."
type: rpg
gofPattern: Prototype
gofCategory: Creational
arcaneSchool: "Illusion // Shadow"
formula: |2
  **FREE
  Ctl-Opt NoMain;

  Dcl-Ds Ward_t Qualified Template;
    Id Int(10);
    PowerLevel Int(10);
    Signature Char(50);
  End-Ds;

  Dcl-Proc CloneWard Export;
    Dcl-Pi *N Pointer;
      pOriginal Pointer Value;
    End-Pi;

    Dcl-S pClone Pointer;
    Dcl-Ds Original Likeds(Ward_t) Based(pOriginal);
    Dcl-Ds Clone Likeds(Ward_t) Based(pClone);

    pClone = %Alloc(%Size(Ward_t));
    Clone = Original; // Deep copy using EVAL-CORR or native assignment

    Return pClone;
  End-Proc;
tags: [creational, ibm-i, runes, prototype]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

# Prototype

Instead of rebuilding a Business Logic Rune from scratch—fetching all DB2 configuration files again—the Prototype pattern uses simple memory manipulation to duplicate the Ward, creating a fresh instance imbued with the exact same properties.
