---
title: "Mediator in ABAP"
description: "Enterprise pact magic using the Mediator pattern."
type: abap
gofPattern: Mediator
gofCategory: Behavioral
arcaneSchool: "Corporate // Enterprise Runes"
formula: |2
  CLASS lcl_mediator DEFINITION.
    PUBLIC SECTION.
      METHODS notify IMPORTING io_sender TYPE REF TO object.
  ENDCLASS.
  CLASS lcl_mediator IMPLEMENTATION.
    METHOD notify.
      " Mediate between parties
    ENDMETHOD.
  ENDCLASS.
tags: [abap, mediator, enterprise, magic]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

# Mediator

The Mediator pattern binds the volatile entities of the ABAP runtime into a highly structured enterprise pact, ensuring safe transaction execution within the vast corporate core.
