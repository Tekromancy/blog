---
title: "Singleton in ABAP"
description: "Enterprise pact magic using the Singleton pattern."
type: abap
gofPattern: Singleton
gofCategory: Creational
arcaneSchool: "Corporate // Enterprise Runes"
formula: |2
  CLASS lcl_singleton DEFINITION CREATE PRIVATE.
    PUBLIC SECTION.
      CLASS-METHODS get_instance RETURNING VALUE(ro_instance) TYPE REF TO lcl_singleton.
    PRIVATE SECTION.
      CLASS-DATA go_instance TYPE REF TO lcl_singleton.
  ENDCLASS.
  CLASS lcl_singleton IMPLEMENTATION.
    METHOD get_instance.
      IF go_instance IS INITIAL.
        CREATE OBJECT go_instance.
      ENDIF.
      ro_instance = go_instance.
    ENDMETHOD.
  ENDCLASS.
tags: [abap, singleton, enterprise, magic]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

# Singleton

The Singleton pattern binds the volatile entities of the ABAP runtime into a highly structured enterprise pact, ensuring safe transaction execution within the vast corporate core.
