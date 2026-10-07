---
title: The Decorator of the Hexed Payloads
description: Dynamically attaching new curses and maledictions to an object without altering its core structure.
type: cobol
gofPattern: Decorator
gofCategory: Structural
arcaneSchool: Necromancy // Corp-mancy
formula: |
       IDENTIFICATION DIVISION.
       CLASS-ID. HEX-DECORATOR INHERITS PAYLOAD.
       
       ENVIRONMENT DIVISION.
       CONFIGURATION SECTION.
       REPOSITORY.
           CLASS PAYLOAD IS "Payload".
           
       OBJECT.
       DATA DIVISION.
       WORKING-STORAGE SECTION.
       01 INNER-PAYLOAD OBJECT REFERENCE PAYLOAD.
       
       PROCEDURE DIVISION.
       
       IDENTIFICATION DIVISION.
       METHOD-ID. NEW.
       DATA DIVISION.
       LINKAGE SECTION.
       01 IN-PAYLOAD OBJECT REFERENCE PAYLOAD.
       PROCEDURE DIVISION USING IN-PAYLOAD.
           SET INNER-PAYLOAD TO IN-PAYLOAD.
       END METHOD NEW.
       
       IDENTIFICATION DIVISION.
       METHOD-ID. PROCESS-DATA.
       PROCEDURE DIVISION.
           * First, execute the inner object's routine
           INVOKE INNER-PAYLOAD "PROCESS-DATA".
           * Then, add our own dark twist
           INVOKE SELF "APPLY-CORRUPTION".
       END METHOD PROCESS-DATA.
       
       IDENTIFICATION DIVISION.
       METHOD-ID. APPLY-CORRUPTION.
       PROCEDURE DIVISION.
           DISPLAY "Corruption applied to the transaction.".
       END METHOD APPLY-CORRUPTION.
       
       END OBJECT.
       END CLASS HEX-DECORATOR.
tags: [necromancy, mainframe, gof, structural]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Decorator pattern is a parasitic attachment to an existing spell. It wraps around a clean transaction payload and, as the data flows through the mainframe arteries, silently injects hexes and corruptions, leaving the original data structure blissfully unaware of its newfound malice.
