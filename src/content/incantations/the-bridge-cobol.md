---
title: The Bridge Over the River Styx
description: Decoupling the high-level necrotic abstraction from its underlying mainframe implementation.
type: cobol
gofPattern: Bridge
gofCategory: Structural
arcaneSchool: Necromancy // Corp-mancy
formula: |
       IDENTIFICATION DIVISION.
       CLASS-ID. SOUL-HARVESTER INHERITS ABSTRACTION.
       
       ENVIRONMENT DIVISION.
       CONFIGURATION SECTION.
       REPOSITORY.
           CLASS ABSTRACTION IS "System.Object"
           CLASS SOUL-IMPLEMENTOR IS "SoulImplementor".
           
       OBJECT.
       DATA DIVISION.
       WORKING-STORAGE SECTION.
       01 IMPLEMENTOR OBJECT REFERENCE SOUL-IMPLEMENTOR.
       
       PROCEDURE DIVISION.
       
       IDENTIFICATION DIVISION.
       METHOD-ID. NEW.
       DATA DIVISION.
       LINKAGE SECTION.
       01 IN-IMP OBJECT REFERENCE SOUL-IMPLEMENTOR.
       PROCEDURE DIVISION USING IN-IMP.
           SET IMPLEMENTOR TO IN-IMP.
       END METHOD NEW.
       
       IDENTIFICATION DIVISION.
       METHOD-ID. HARVEST.
       PROCEDURE DIVISION.
           * The bridge delegates the grim work
           INVOKE IMPLEMENTOR "EXTRACT-ECTOPLASM".
           INVOKE IMPLEMENTOR "STORE-IN-LEDGER".
       END METHOD HARVEST.
       
       END OBJECT.
       END CLASS SOUL-HARVESTER.
tags: [necromancy, mainframe, gof, structural]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Bridge pattern separates the high ritual of the `SOUL-HARVESTER` from the grim, dirty implementation details of the actual ectoplasm extraction. The abstraction can evolve to harvest different entities, while the underlying implementation can shift from IMS to DB2 without breaking the dark covenant.
