---
title: "Proxy in ABAP"
description: "Enterprise pact magic using the Proxy pattern."
type: abap
gofPattern: Proxy
gofCategory: Structural
arcaneSchool: "Corporate // Enterprise Runes"
formula: |2
  CLASS lcl_proxy DEFINITION.
    PUBLIC SECTION.
      METHODS request.
    PRIVATE SECTION.
      DATA mo_real_subject TYPE REF TO object.
  ENDCLASS.
  CLASS lcl_proxy IMPLEMENTATION.
    METHOD request.
      " Forward magic request
    ENDMETHOD.
  ENDCLASS.
tags: [abap, proxy, enterprise, magic]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

# Proxy

The Proxy pattern binds the volatile entities of the ABAP runtime into a highly structured enterprise pact, ensuring safe transaction execution within the vast corporate core.
