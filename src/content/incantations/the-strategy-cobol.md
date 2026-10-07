---
title: The Strategy of the Ritual Sacrifice
description: Defining a family of algorithms, encapsulating each one, and making them interchangeable based on astrological conditions.
type: cobol
gofPattern: Strategy
gofCategory: Behavioral
arcaneSchool: Necromancy // Corp-mancy
formula: |
       IDENTIFICATION DIVISION.
       CLASS-ID. SACRIFICIAL-RITUAL INHERITS BASE-OBJECT.
       
       ENVIRONMENT DIVISION.
       CONFIGURATION SECTION.
       REPOSITORY.
           CLASS BASE-OBJECT IS "System.Object"
           CLASS I-STRATEGY IS "ISacrificeStrategy".
           
       OBJECT.
       DATA DIVISION.
       WORKING-STORAGE SECTION.
       01 SACRIFICE-METHOD OBJECT REFERENCE I-STRATEGY.
       
       PROCEDURE DIVISION.
       
       IDENTIFICATION DIVISION.
       METHOD-ID. SET-STRATEGY.
       DATA DIVISION.
       LINKAGE SECTION.
       01 NEW-METHOD OBJECT REFERENCE I-STRATEGY.
       PROCEDURE DIVISION USING NEW-METHOD.
           SET SACRIFICE-METHOD TO NEW-METHOD.
       END METHOD SET-STRATEGY.
       
       IDENTIFICATION DIVISION.
       METHOD-ID. EXECUTE-OFFERING.
       DATA DIVISION.
       LINKAGE SECTION.
       01 TARGET-SOUL PIC X(20).
       PROCEDURE DIVISION USING TARGET-SOUL.
           IF SACRIFICE-METHOD NOT = NULL THEN
               INVOKE SACRIFICE-METHOD "PERFORM" USING TARGET-SOUL
           ELSE
               DISPLAY "No valid ritual defined for the offering."
           END-IF.
       END METHOD EXECUTE-OFFERING.
       
       END OBJECT.
       END CLASS SACRIFICIAL-RITUAL.
tags: [necromancy, mainframe, gof, behavioral]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Strategy pattern is the ultimate grimoire for the flexible dark arts practitioner. Sometimes the stars demand a silent blood-letting; other times, a fiery immolation is required. By encapsulating these algorithms into interchangeable Strategy objects, the ritual remains the same at a high level while the gruesome details are swapped at runtime.
