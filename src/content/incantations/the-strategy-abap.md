---
title: "Strategy in ABAP"
description: "Enterprise pact magic using the Strategy pattern."
type: abap
gofPattern: Strategy
gofCategory: Behavioral
arcaneSchool: "Corporate // Enterprise Runes"
formula: |2
  INTERFACE lif_strategy.
    METHODS execute_strategy.
  ENDINTERFACE.
  CLASS lcl_context DEFINITION.
    PUBLIC SECTION.
      METHODS set_strategy IMPORTING io_strategy TYPE REF TO lif_strategy.
      METHODS execute.
    PRIVATE SECTION.
      DATA mo_strategy TYPE REF TO lif_strategy.
  ENDCLASS.
  CLASS lcl_context IMPLEMENTATION.
    METHOD set_strategy.
      mo_strategy = io_strategy.
    ENDMETHOD.
    METHOD execute.
      mo_strategy->execute_strategy( ).
    ENDMETHOD.
  ENDCLASS.
tags: [abap, strategy, enterprise, magic]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

# Strategy

The Strategy pattern binds the volatile entities of the ABAP runtime into a highly structured enterprise pact, ensuring safe transaction execution within the vast corporate core.
