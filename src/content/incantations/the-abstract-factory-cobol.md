---
title: The Abstract Factory of Ancient Ledgers
description: Summoning entire lineages of financial daemons from the mainframe abyss without specifying their concrete incantations.
type: cobol
gofPattern: Abstract Factory
gofCategory: Creational
arcaneSchool: Necromancy // Corp-mancy
formula: |
       IDENTIFICATION DIVISION.
       CLASS-ID. LEDGER-FACTORY INHERITS BASE-DAEMON.
       
       ENVIRONMENT DIVISION.
       CONFIGURATION SECTION.
       REPOSITORY.
           CLASS BASE-DAEMON IS "System.Object"
           CLASS CURSE-LEDGER IS "CurseLedger"
           CLASS BOON-LEDGER IS "BoonLedger".
           
       IDENTIFICATION DIVISION.
       FACTORY.
       PROCEDURE DIVISION.
       
       IDENTIFICATION DIVISION.
       METHOD-ID. CREATE-CURSE-LEDGER.
       DATA DIVISION.
       LINKAGE SECTION.
       01 RET-LEDGER OBJECT REFERENCE CURSE-LEDGER.
       PROCEDURE DIVISION RETURNING RET-LEDGER.
           INVOKE CURSE-LEDGER "NEW" RETURNING RET-LEDGER.
       END METHOD CREATE-CURSE-LEDGER.
       
       IDENTIFICATION DIVISION.
       METHOD-ID. CREATE-BOON-LEDGER.
       DATA DIVISION.
       LINKAGE SECTION.
       01 RET-LEDGER OBJECT REFERENCE BOON-LEDGER.
       PROCEDURE DIVISION RETURNING RET-LEDGER.
           INVOKE BOON-LEDGER "NEW" RETURNING RET-LEDGER.
       END METHOD CREATE-BOON-LEDGER.
       
       END FACTORY.
       END CLASS LEDGER-FACTORY.
tags: [necromancy, mainframe, gof, creational]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Abstract Factory binds a covenant with the deep mainframe, allowing the Necromancer to summon related families of ledger-spirits (curses and boons) without knowing the exact bytes of their dark conception. True corporate necromancy relies on abstracting the horror away from the high-level business logic.
