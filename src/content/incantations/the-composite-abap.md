---
title: "Composite in ABAP"
description: "Enterprise pact magic using the Composite pattern."
type: abap
gofPattern: Composite
gofCategory: Structural
arcaneSchool: "Corporate // Enterprise Runes"
formula: |2
  CLASS lcl_composite DEFINITION.
    PUBLIC SECTION.
      METHODS operation.
      METHODS add IMPORTING io_component TYPE REF TO object.
    PRIVATE SECTION.
      DATA mt_children TYPE STANDARD TABLE OF REF TO object.
  ENDCLASS.
  CLASS lcl_composite IMPLEMENTATION.
    METHOD operation.
      " Propagate spell
    ENDMETHOD.
    METHOD add.
      APPEND io_component TO mt_children.
    ENDMETHOD.
  ENDCLASS.
tags: [abap, composite, enterprise, magic]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

# Composite

The Composite pattern binds the volatile entities of the ABAP runtime into a highly structured enterprise pact, ensuring safe transaction execution within the vast corporate core.
