---
title: "Abstract Factory: Wards of the iSeries"
description: "Conjure families of related Wards (Data Structures and Procedure Pointers) without specifying their concrete fixed-format origins."
type: rpg
gofPattern: Abstract Factory
gofCategory: Creational
arcaneSchool: "Conjuration // Apportation"
formula: |2
  **FREE
  Ctl-Opt NoMain;

  // Abstract Factory for Business Logic Runes
  Dcl-Ds RuneFactory_t Qualified Template;
    CreateWand Pointer(*Proc);
    CreateStaff Pointer(*Proc);
  End-Ds;

  Dcl-Proc GetFireFactory Export;
    Dcl-Pi *N Pointer;
    End-Pi;

    Dcl-S pFactory Pointer Static;
    Dcl-Ds Factory Lika(RuneFactory_t) Based(pFactory);

    If pFactory = *Null;
       pFactory = %Alloc(%Size(RuneFactory_t));
       Factory.CreateWand = %Paddr('CREATE_FIRE_WAND');
       Factory.CreateStaff = %Paddr('CREATE_FIRE_STAFF');
    EndIf;

    Return pFactory;
  End-Proc;
tags: [creational, ibm-i, runes, factory]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

# Abstract Factory

Deep within the AS/400 mainframes, old fixed-format logic has been re-cast into Free-Format Spells. The Abstract Factory provides a conduit to manifest entire arsenals of Business Logic Runes without tying the invoker to the raw iron.
