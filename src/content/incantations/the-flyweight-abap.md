---
title: "Flyweight in ABAP"
description: "Enterprise pact magic using the Flyweight pattern."
type: abap
gofPattern: Flyweight
gofCategory: Structural
arcaneSchool: "Corporate // Enterprise Runes"
formula: |2
  CLASS lcl_flyweight_factory DEFINITION.
    PUBLIC SECTION.
      METHODS get_flyweight IMPORTING iv_key TYPE string RETURNING VALUE(ro_fw) TYPE REF TO object.
  ENDCLASS.
  CLASS lcl_flyweight_factory IMPLEMENTATION.
    METHOD get_flyweight.
      " Return shared entity
    ENDMETHOD.
  ENDCLASS.
tags: [abap, flyweight, enterprise, magic]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

# Flyweight

The Flyweight pattern binds the volatile entities of the ABAP runtime into a highly structured enterprise pact, ensuring safe transaction execution within the vast corporate core.
