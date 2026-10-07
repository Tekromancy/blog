---
title: The Composite of the Corporate Hierarchy
description: Treating individual thralls and massive demonic divisions as a single uniform entity.
type: cobol
gofPattern: Composite
gofCategory: Structural
arcaneSchool: Necromancy // Corp-mancy
formula: |
       IDENTIFICATION DIVISION.
       CLASS-ID. CORPORATE-LEGION INHERITS ORG-ENTITY.
       
       ENVIRONMENT DIVISION.
       CONFIGURATION SECTION.
       REPOSITORY.
           CLASS ORG-ENTITY IS "OrgEntity"
           CLASS LIST IS "ArrayList".
           
       OBJECT.
       DATA DIVISION.
       WORKING-STORAGE SECTION.
       01 CHILDREN OBJECT REFERENCE LIST.
       
       PROCEDURE DIVISION.
       
       IDENTIFICATION DIVISION.
       METHOD-ID. NEW.
       PROCEDURE DIVISION.
           INVOKE LIST "NEW" RETURNING CHILDREN.
       END METHOD NEW.
       
       IDENTIFICATION DIVISION.
       METHOD-ID. ADD-ENTITY.
       DATA DIVISION.
       LINKAGE SECTION.
       01 IN-ENTITY OBJECT REFERENCE ORG-ENTITY.
       PROCEDURE DIVISION USING IN-ENTITY.
           INVOKE CHILDREN "ADD" USING IN-ENTITY.
       END METHOD ADD-ENTITY.
       
       IDENTIFICATION DIVISION.
       METHOD-ID. EXECUTE-ORDERS.
       DATA DIVISION.
       WORKING-STORAGE SECTION.
       01 I PIC S9(9) COMP-5.
       01 CHILD OBJECT REFERENCE ORG-ENTITY.
       PROCEDURE DIVISION.
           * Loop through all underlings and force compliance
           PERFORM VARYING I FROM 0 BY 1 UNTIL I >= CHILDREN::"SIZE"
               INVOKE CHILDREN "GET" USING I RETURNING CHILD
               INVOKE CHILD "EXECUTE-ORDERS"
           END-PERFORM.
       END METHOD EXECUTE-ORDERS.
       
       END OBJECT.
       END CLASS CORPORATE-LEGION.
tags: [necromancy, mainframe, gof, structural]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

In the underworld of corporate banking, a single thrall and an entire division of demons are essentially the same: they are nodes in a hierarchy meant to execute orders. The Composite pattern allows the Arch-Lich CEO to issue a single command, which cascades endlessly down the jagged org chart.
