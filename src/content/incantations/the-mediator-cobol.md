---
title: The Mediator of the Warlock Council
description: Centralizing complex communications between disparate demonic factions to prevent an entangled web of chaos.
type: cobol
gofPattern: Mediator
gofCategory: Behavioral
arcaneSchool: Necromancy // Corp-mancy
formula: |
       IDENTIFICATION DIVISION.
       CLASS-ID. DARK-COUNCIL INHERITS I-MEDIATOR.
       
       ENVIRONMENT DIVISION.
       CONFIGURATION SECTION.
       REPOSITORY.
           CLASS I-MEDIATOR IS "IMediator"
           CLASS WARLOCK IS "Warlock".
           
       OBJECT.
       DATA DIVISION.
       WORKING-STORAGE SECTION.
       01 WARLOCK-A OBJECT REFERENCE WARLOCK.
       01 WARLOCK-B OBJECT REFERENCE WARLOCK.
       
       PROCEDURE DIVISION.
       
       IDENTIFICATION DIVISION.
       METHOD-ID. REGISTER-WARLOCKS.
       DATA DIVISION.
       LINKAGE SECTION.
       01 IN-A OBJECT REFERENCE WARLOCK.
       01 IN-B OBJECT REFERENCE WARLOCK.
       PROCEDURE DIVISION USING IN-A IN-B.
           SET WARLOCK-A TO IN-A.
           SET WARLOCK-B TO IN-B.
       END METHOD REGISTER-WARLOCKS.
       
       IDENTIFICATION DIVISION.
       METHOD-ID. NOTIFY.
       DATA DIVISION.
       LINKAGE SECTION.
       01 SENDER OBJECT REFERENCE WARLOCK.
       01 EVENT-ID PIC X(20).
       PROCEDURE DIVISION USING SENDER EVENT-ID.
           IF SENDER = WARLOCK-A AND EVENT-ID = "SUMMON" THEN
               INVOKE WARLOCK-B "PREPARE-DEFENSES"
           END-IF.
           IF SENDER = WARLOCK-B AND EVENT-ID = "ATTACK" THEN
               INVOKE WARLOCK-A "RETALIATE"
           END-IF.
       END METHOD NOTIFY.
       
       END OBJECT.
       END CLASS DARK-COUNCIL.
tags: [necromancy, mainframe, gof, behavioral]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

When Warlocks are permitted to communicate directly with one another, the resulting architecture is a tangled, explosive mess of blood feuds and infinite loops. The Mediator acts as the Dark Council, forcing all entities to direct their grievances and alerts through a single, strictly controlled hub.
