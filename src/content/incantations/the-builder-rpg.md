---
title: "Builder: Forging the Mainframe Construct"
description: "Step-by-step assembly of complex Business Logic Runes on the IBM iSeries."
type: rpg
gofPattern: Builder
gofCategory: Creational
arcaneSchool: "Transmutation // Artifice"
formula: |2
  **FREE
  Ctl-Opt NoMain;

  Dcl-Ds Golem_t Qualified Template;
    Head Char(20);
    Body Char(20);
    Core Char(20);
  End-Ds;

  Dcl-Proc Builder_Init Export;
    Dcl-Pi *N Pointer;
    End-Pi;
    Dcl-S pGolem Pointer;
    pGolem = %Alloc(%Size(Golem_t));
    Return pGolem;
  End-Proc;

  Dcl-Proc Builder_SetCore Export;
    Dcl-Pi *N;
      pGolem Pointer Value;
      coreType Char(20) Const;
    End-Pi;
    Dcl-Ds Golem Likeds(Golem_t) Based(pGolem);
    Golem.Core = coreType;
  End-Proc;
tags: [creational, ibm-i, runes, builder]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

# Builder

The Builder pattern separates the incantation of a complex ward from its final representation. On the iSeries, this translates to incrementally populating a dynamic Data Structure before unleashing its logic across the DB2 files.
