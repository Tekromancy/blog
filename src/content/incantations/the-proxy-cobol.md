---
title: The Proxy of the Gatekeeper
description: Controlling access to a massive, sleeping ancient daemon with a lightweight spectral surrogate.
type: cobol
gofPattern: Proxy
gofCategory: Structural
arcaneSchool: Necromancy // Corp-mancy
formula: |
       IDENTIFICATION DIVISION.
       CLASS-ID. DAEMON-PROXY INHERITS BASE-INTERFACE.
       
       ENVIRONMENT DIVISION.
       CONFIGURATION SECTION.
       REPOSITORY.
           CLASS BASE-INTERFACE IS "BaseInterface"
           CLASS ANCIENT-DAEMON IS "AncientDaemon".
           
       OBJECT.
       DATA DIVISION.
       WORKING-STORAGE SECTION.
       01 REAL-DAEMON OBJECT REFERENCE ANCIENT-DAEMON VALUE NULL.
       
       PROCEDURE DIVISION.
       
       IDENTIFICATION DIVISION.
       METHOD-ID. AWAKEN-AND-EXECUTE.
       PROCEDURE DIVISION.
           * Lazy initialization of the dread terror
           IF REAL-DAEMON = NULL THEN
               INVOKE ANCIENT-DAEMON "NEW" RETURNING REAL-DAEMON
               INVOKE REAL-DAEMON "PERFORM-RITUAL-OF-AWAKENING"
           END-IF.
           
           INVOKE REAL-DAEMON "EXECUTE-WRATH".
       END METHOD AWAKEN-AND-EXECUTE.
       
       END OBJECT.
       END CLASS DAEMON-PROXY.
tags: [necromancy, mainframe, gof, structural]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

Waking the `ANCIENT-DAEMON` consumes vast amounts of processing cycles and risks tearing a hole in the logical partitions. The Proxy stands in its place, accepting commands and only undertaking the catastrophic cost of awakening the true terror when absolutely strictly necessary.
