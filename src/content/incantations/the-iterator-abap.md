---
title: "Iterator in ABAP"
description: "Enterprise pact magic using the Iterator pattern."
type: abap
gofPattern: Iterator
gofCategory: Behavioral
arcaneSchool: "Corporate // Enterprise Runes"
formula: |2
  INTERFACE lif_iterator.
    METHODS get_next RETURNING VALUE(ro_item) TYPE REF TO object.
    METHODS has_next RETURNING VALUE(rv_has) TYPE abap_bool.
  ENDINTERFACE.
  CLASS lcl_collection DEFINITION.
    PUBLIC SECTION.
      METHODS create_iterator RETURNING VALUE(ro_iterator) TYPE REF TO lif_iterator.
  ENDCLASS.
  CLASS lcl_collection IMPLEMENTATION.
    METHOD create_iterator.
      " Spawn iterator
    ENDMETHOD.
  ENDCLASS.
tags: [abap, iterator, enterprise, magic]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

# Iterator

The Iterator pattern binds the volatile entities of the ABAP runtime into a highly structured enterprise pact, ensuring safe transaction execution within the vast corporate core.
