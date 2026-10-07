---
title: "Prototype in ABAP"
description: "Enterprise pact magic using the Prototype pattern."
type: abap
gofPattern: Prototype
gofCategory: Creational
arcaneSchool: "Corporate // Enterprise Runes"
formula: |2
  INTERFACE lif_prototype.
    METHODS clone RETURNING VALUE(ro_clone) TYPE REF TO lif_prototype.
  ENDINTERFACE.
  CLASS lcl_enterprise_prototype DEFINITION.
    PUBLIC SECTION.
      INTERFACES lif_prototype.
  ENDCLASS.
  CLASS lcl_enterprise_prototype IMPLEMENTATION.
    METHOD lif_prototype~clone.
      " Clone soul
    ENDMETHOD.
  ENDCLASS.
tags: [abap, prototype, enterprise, magic]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

# Prototype

The Prototype pattern binds the volatile entities of the ABAP runtime into a highly structured enterprise pact, ensuring safe transaction execution within the vast corporate core.
