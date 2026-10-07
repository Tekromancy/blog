---
title: "Factory Method in ABAP"
description: "Enterprise pact magic using the Factory Method pattern."
type: abap
gofPattern: Factory Method
gofCategory: Creational
arcaneSchool: "Corporate // Enterprise Runes"
formula: |2
  CLASS lcl_enterprise_creator DEFINITION ABSTRACT.
    PUBLIC SECTION.
      METHODS factory_method ABSTRACT RETURNING VALUE(ro_product) TYPE REF TO object.
  ENDCLASS.
  CLASS lcl_concrete_enterprise_creator DEFINITION INHERITING FROM lcl_enterprise_creator.
    PUBLIC SECTION.
      METHODS factory_method REDEFINITION.
  ENDCLASS.
  CLASS lcl_concrete_enterprise_creator IMPLEMENTATION.
    METHOD factory_method.
      " Spawn entity
    ENDMETHOD.
  ENDCLASS.
tags: [abap, factory-method, enterprise, magic]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

# Factory Method

The Factory Method pattern binds the volatile entities of the ABAP runtime into a highly structured enterprise pact, ensuring safe transaction execution within the vast corporate core.
