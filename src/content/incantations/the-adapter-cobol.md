---
title: The Adapter of the Ancient Protocols
description: Translating forbidden, archaic mainframe curses into modern object-oriented invocations.
type: cobol
gofPattern: Adapter
gofCategory: Structural
arcaneSchool: Necromancy // Corp-mancy
formula: |
       IDENTIFICATION DIVISION.
       CLASS-ID. PROTOCOL-ADAPTER INHERITS MODERN-INTERFACE.
       
       ENVIRONMENT DIVISION.
       CONFIGURATION SECTION.
       REPOSITORY.
           CLASS MODERN-INTERFACE IS "ModernInterface"
           CLASS ARCHAIC-CURSE IS "ArchaicCurse".
           
       OBJECT.
       DATA DIVISION.
       WORKING-STORAGE SECTION.
       01 OLD-CURSE OBJECT REFERENCE ARCHAIC-CURSE.
       
       PROCEDURE DIVISION.
       
       IDENTIFICATION DIVISION.
       METHOD-ID. NEW.
       DATA DIVISION.
       LINKAGE SECTION.
       01 IN-CURSE OBJECT REFERENCE ARCHAIC-CURSE.
       PROCEDURE DIVISION USING IN-CURSE.
           SET OLD-CURSE TO IN-CURSE.
       END METHOD NEW.
       
       IDENTIFICATION DIVISION.
       METHOD-ID. EXECUTE-MODERN-REQUEST.
       PROCEDURE DIVISION.
           * Wrapping the ancient horror in a clean API
           INVOKE OLD-CURSE "INVOKE_ANCIENT_HORROR_77".
       END METHOD EXECUTE-MODERN-REQUEST.
       
       END OBJECT.
       END CLASS PROTOCOL-ADAPTER.
tags: [necromancy, mainframe, gof, structural]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Adapter is a sacrificial lamb that stands between the modern world and the ancient terrors of legacy code. It wraps the blood-soaked, procedural horrors of the `ARCHAIC-CURSE` in a pristine, polite interface, shielding the young acolytes from the madness of the old ways.
