---
title: "Memento in ABAP"
description: "Enterprise pact magic using the Memento pattern."
type: abap
gofPattern: Memento
gofCategory: Behavioral
arcaneSchool: "Corporate // Enterprise Runes"
formula: |2
  CLASS lcl_memento DEFINITION.
    PUBLIC SECTION.
      DATA state TYPE string.
  ENDCLASS.
  CLASS lcl_originator DEFINITION.
    PUBLIC SECTION.
      METHODS save RETURNING VALUE(ro_memento) TYPE REF TO lcl_memento.
      METHODS restore IMPORTING io_memento TYPE REF TO lcl_memento.
  ENDCLASS.
  CLASS lcl_originator IMPLEMENTATION.
    METHOD save.
      " Snapshot state
    ENDMETHOD.
    METHOD restore.
      " Revert to state
    ENDMETHOD.
  ENDCLASS.
tags: [abap, memento, enterprise, magic]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

# Memento

The Memento pattern binds the volatile entities of the ABAP runtime into a highly structured enterprise pact, ensuring safe transaction execution within the vast corporate core.
