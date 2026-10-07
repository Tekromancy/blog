---
title: The Facade of the Terminal Interface
description: Providing a single, simple incantation to obscure the horrifying complexity of the legacy backend.
type: cobol
gofPattern: Facade
gofCategory: Structural
arcaneSchool: Necromancy // Corp-mancy
formula: |
       IDENTIFICATION DIVISION.
       CLASS-ID. MAINFRAME-FACADE INHERITS BASE-DAEMON.
       
       ENVIRONMENT DIVISION.
       CONFIGURATION SECTION.
       REPOSITORY.
           CLASS BASE-DAEMON IS "System.Object"
           CLASS AUTH-SYSTEM IS "AuthSystem"
           CLASS LEDGER-DB IS "LedgerDb"
           CLASS AUDIT-LOG IS "AuditLog".
           
       OBJECT.
       PROCEDURE DIVISION.
       
       IDENTIFICATION DIVISION.
       METHOD-ID. EXECUTE-TRANSFER.
       DATA DIVISION.
       LINKAGE SECTION.
       01 ACCT-FROM PIC X(10).
       01 ACCT-TO   PIC X(10).
       01 AMOUNT    PIC 9(9)V99.
       PROCEDURE DIVISION USING ACCT-FROM ACCT-TO AMOUNT.
           * Hide the horrific ritual steps from the caller
           INVOKE AUTH-SYSTEM "VERIFY-BLOODLINE" USING ACCT-FROM.
           INVOKE LEDGER-DB "DEBIT" USING ACCT-FROM AMOUNT.
           INVOKE LEDGER-DB "CREDIT" USING ACCT-TO AMOUNT.
           INVOKE AUDIT-LOG "RECORD-SIN" USING ACCT-FROM ACCT-TO AMOUNT.
       END METHOD EXECUTE-TRANSFER.
       
       END OBJECT.
       END CLASS MAINFRAME-FACADE.
tags: [necromancy, mainframe, gof, structural]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

Beneath the surface of the bank lies a labyrinth of cursed subsystems—bloodline verifications, arcane ledger manipulations, and inescapable audit logs. The Facade pattern creates a monolithic, smooth surface for the casual practitioner to interact with, hiding the nightmarish reality of the transaction lifecycle.
