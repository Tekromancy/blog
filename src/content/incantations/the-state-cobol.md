---
title: The State of the Possessed Machine
description: Allowing an object to alter its behavior entirely when its internal demonic possession changes.
type: cobol
gofPattern: State
gofCategory: Behavioral
arcaneSchool: Necromancy // Corp-mancy
formula: |
       IDENTIFICATION DIVISION.
       CLASS-ID. POSSESSED-TERMINAL INHERITS BASE-OBJECT.
       
       ENVIRONMENT DIVISION.
       CONFIGURATION SECTION.
       REPOSITORY.
           CLASS BASE-OBJECT IS "System.Object"
           CLASS I-STATE IS "IState"
           CLASS DORMANT-STATE IS "DormantState".
           
       OBJECT.
       DATA DIVISION.
       WORKING-STORAGE SECTION.
       01 CURRENT-STATE OBJECT REFERENCE I-STATE.
       
       PROCEDURE DIVISION.
       
       IDENTIFICATION DIVISION.
       METHOD-ID. NEW.
       PROCEDURE DIVISION.
           INVOKE DORMANT-STATE "NEW" RETURNING CURRENT-STATE.
       END METHOD NEW.
       
       IDENTIFICATION DIVISION.
       METHOD-ID. SET-STATE.
       DATA DIVISION.
       LINKAGE SECTION.
       01 NEW-STATE OBJECT REFERENCE I-STATE.
       PROCEDURE DIVISION USING NEW-STATE.
           SET CURRENT-STATE TO NEW-STATE.
       END METHOD SET-STATE.
       
       IDENTIFICATION DIVISION.
       METHOD-ID. RECEIVE-INPUT.
       DATA DIVISION.
       LINKAGE SECTION.
       01 USER-INPUT PIC X(50).
       PROCEDURE DIVISION USING USER-INPUT.
           * The behavior depends entirely on the current spirit inhabiting the machine
           INVOKE CURRENT-STATE "HANDLE-INPUT" USING SELF USER-INPUT.
       END METHOD RECEIVE-INPUT.
       
       END OBJECT.
       END CLASS POSSESSED-TERMINAL.
tags: [necromancy, mainframe, gof, behavioral]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

To the user, the terminal appears the same, but the entity within shifts constantly. The State pattern allows the context object to swap out the spirit currently possessing it. In a dormant state, it echoes keystrokes; in a frenzied state, it consumes the operator's soul instead of printing to standard output.
