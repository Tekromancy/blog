---
title: The Abstract Factory of the Ancestral Void
description: Conjure families of related void-artifacts without specifying their concrete structures.
type: bcpl
gofPattern: Abstract Factory
gofCategory: Creational
arcaneSchool: "Conjuration // Voidmancy"
formula: |2
  GET "libhdr"

  // The Void Interface
  MANIFEST $(
    VOID_CREATE_WEAPON = 0
    VOID_CREATE_ARMOR = 1
  $)

  // Concrete Factories
  LET AbyssalFactory(op) = VALOF $(
    SWITCHON op INTO $(
      CASE VOID_CREATE_WEAPON: RESULTIS "Abyssal Blade"
      CASE VOID_CREATE_ARMOR:  RESULTIS "Abyssal Plating"
      DEFAULT: RESULTIS "Nothing"
    $)
  $)

  LET AstralFactory(op) = VALOF $(
    SWITCHON op INTO $(
      CASE VOID_CREATE_WEAPON: RESULTIS "Astral Spear"
      CASE VOID_CREATE_ARMOR:  RESULTIS "Astral Aegis"
      DEFAULT: RESULTIS "Nothing"
    $)
  $)

  // Client Conjuration
  LET ConjureGear(factory) BE $(
    LET weapon = factory(VOID_CREATE_WEAPON)
    LET armor = factory(VOID_CREATE_ARMOR)
    writef("Conjured Weapon: %s*n", weapon)
    writef("Conjured Armor: %s*n", armor)
  $)

  LET START() BE $(
    writef("--- Abyssal Conjuration ---*n")
    ConjureGear(AbyssalFactory)
    writef("--- Astral Conjuration ---*n")
    ConjureGear(AstralFactory)
  $)
tags: [abstract-factory, void, conjuration]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
