---
title: The Command of the Bound Writ
description: Encapsulating a dark action into a self-contained rune, ready to be executed, queued, or reversed at will.
type: cobol
gofPattern: Command
gofCategory: Behavioral
arcaneSchool: Necromancy // Corp-mancy
formula: |
       IDENTIFICATION DIVISION.
       CLASS-ID. PURGE-COMMAND INHERITS I-COMMAND.
       
       ENVIRONMENT DIVISION.
       CONFIGURATION SECTION.
       REPOSITORY.
           CLASS I-COMMAND IS "ICommand"
           CLASS SYSTEM-TARGET IS "SystemTarget".
           
       OBJECT.
       DATA DIVISION.
       WORKING-STORAGE SECTION.
       01 TARGET-ENTITY OBJECT REFERENCE SYSTEM-TARGET.
       
       PROCEDURE DIVISION.
       
       IDENTIFICATION DIVISION.
       METHOD-ID. NEW.
       DATA DIVISION.
       LINKAGE SECTION.
       01 IN-TARGET OBJECT REFERENCE SYSTEM-TARGET.
       PROCEDURE DIVISION USING IN-TARGET.
           SET TARGET-ENTITY TO IN-TARGET.
       END METHOD NEW.
       
       IDENTIFICATION DIVISION.
       METHOD-ID. EXECUTE.
       PROCEDURE DIVISION.
           INVOKE TARGET-ENTITY "ANNIHILATE-RECORDS".
       END METHOD EXECUTE.
       
       IDENTIFICATION DIVISION.
       METHOD-ID. UNDO.
       PROCEDURE DIVISION.
           INVOKE TARGET-ENTITY "RESURRECT-RECORDS".
       END METHOD UNDO.
       
       END OBJECT.
       END CLASS PURGE-COMMAND.
tags: [necromancy, mainframe, gof, behavioral]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Command pattern crystallizes a destructive impulse into a solid, tangible object—a Bound Writ. This allows the master program to queue up a series of purges, pass them around like cursed currency, and even command them to undo their devastation by whispering the incantation of resurrection.
