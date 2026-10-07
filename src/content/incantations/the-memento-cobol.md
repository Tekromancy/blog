---
title: The Memento of the Phylactery
description: Capturing and externalizing an object's internal state so it can be restored to its past life after a fatal error.
type: cobol
gofPattern: Memento
gofCategory: Behavioral
arcaneSchool: Necromancy // Corp-mancy
formula: |
       IDENTIFICATION DIVISION.
       CLASS-ID. LICH-PHYLACTERY INHERITS BASE-OBJECT.
       
       ENVIRONMENT DIVISION.
       CONFIGURATION SECTION.
       REPOSITORY.
           CLASS BASE-OBJECT IS "System.Object".
           
       OBJECT.
       DATA DIVISION.
       WORKING-STORAGE SECTION.
       01 STORED-HP PIC 9(6).
       01 STORED-MANA PIC 9(6).
       
       PROCEDURE DIVISION.
       
       IDENTIFICATION DIVISION.
       METHOD-ID. NEW.
       DATA DIVISION.
       LINKAGE SECTION.
       01 IN-HP PIC 9(6).
       01 IN-MANA PIC 9(6).
       PROCEDURE DIVISION USING IN-HP IN-MANA.
           MOVE IN-HP TO STORED-HP.
           MOVE IN-MANA TO STORED-MANA.
       END METHOD NEW.
       
       IDENTIFICATION DIVISION.
       METHOD-ID. GET-STATE-HP.
       DATA DIVISION.
       LINKAGE SECTION.
       01 RET-HP PIC 9(6).
       PROCEDURE DIVISION RETURNING RET-HP.
           MOVE STORED-HP TO RET-HP.
       END METHOD GET-STATE-HP.
       
       IDENTIFICATION DIVISION.
       METHOD-ID. GET-STATE-MANA.
       DATA DIVISION.
       LINKAGE SECTION.
       01 RET-MANA PIC 9(6).
       PROCEDURE DIVISION RETURNING RET-MANA.
           MOVE STORED-MANA TO RET-MANA.
       END METHOD GET-STATE-MANA.
       
       END OBJECT.
       END CLASS LICH-PHYLACTERY.
tags: [necromancy, mainframe, gof, behavioral]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Memento pattern is the ultimate act of self-preservation: the creation of a Phylactery. Before embarking on a highly volatile and potentially fatal transaction, the Lich saves its precise internal state into this black box. Should destruction occur, the Caretaker can smash the Phylactery and resurrect the Lich exactly as it was.
