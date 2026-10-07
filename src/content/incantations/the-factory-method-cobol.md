---
title: The Factory Method of Blood Transactions
description: Deferring the instantiation of blood pacts to subclasses, letting the ancient spirits decide which contract to forge.
type: cobol
gofPattern: Factory Method
gofCategory: Creational
arcaneSchool: Necromancy // Corp-mancy
formula: |
       IDENTIFICATION DIVISION.
       CLASS-ID. PACT-FACTORY INHERITS BASE-DAEMON.
       
       ENVIRONMENT DIVISION.
       CONFIGURATION SECTION.
       REPOSITORY.
           CLASS BASE-DAEMON IS "System.Object"
           CLASS PACT IS "Pact".
           
       OBJECT.
       PROCEDURE DIVISION.
       
       IDENTIFICATION DIVISION.
       METHOD-ID. CREATE-PACT.
       DATA DIVISION.
       LINKAGE SECTION.
       01 RET-PACT OBJECT REFERENCE PACT.
       PROCEDURE DIVISION RETURNING RET-PACT.
           * To be overridden by concrete necromancers
           SET RET-PACT TO NULL.
       END METHOD CREATE-PACT.
       
       IDENTIFICATION DIVISION.
       METHOD-ID. EXECUTE-RITUAL.
       DATA DIVISION.
       WORKING-STORAGE SECTION.
       01 THE-PACT OBJECT REFERENCE PACT.
       PROCEDURE DIVISION.
           INVOKE SELF "CREATE-PACT" RETURNING THE-PACT.
           INVOKE THE-PACT "SIGN-WITH-BLOOD".
       END METHOD EXECUTE-RITUAL.
       
       END OBJECT.
       END CLASS PACT-FACTORY.
tags: [necromancy, mainframe, gof, creational]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Factory Method establishes a hollow shell of a ritual. It is the responsibility of the lesser acolytes (subclasses) to step into the circle and materialize the exact nature of the blood pact. The high necromancer simply executes the ritual, uncaring of whose blood is spilled.
