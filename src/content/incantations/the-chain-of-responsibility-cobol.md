---
title: The Chain of Responsibility in the Approvals Labyrinth
description: Passing a dark request along a chain of overseers until one possesses the rank to fulfill or destroy it.
type: cobol
gofPattern: Chain of Responsibility
gofCategory: Behavioral
arcaneSchool: Necromancy // Corp-mancy
formula: |
       IDENTIFICATION DIVISION.
       CLASS-ID. LICH-APPROVER INHERITS BASE-APPROVER.
       
       ENVIRONMENT DIVISION.
       CONFIGURATION SECTION.
       REPOSITORY.
           CLASS BASE-APPROVER IS "BaseApprover".
           
       OBJECT.
       DATA DIVISION.
       WORKING-STORAGE SECTION.
       01 NEXT-IN-CHAIN OBJECT REFERENCE BASE-APPROVER VALUE NULL.
       01 LICH-RANK     PIC 9(2).
       
       PROCEDURE DIVISION.
       
       IDENTIFICATION DIVISION.
       METHOD-ID. SET-NEXT.
       DATA DIVISION.
       LINKAGE SECTION.
       01 IN-NEXT OBJECT REFERENCE BASE-APPROVER.
       PROCEDURE DIVISION USING IN-NEXT.
           SET NEXT-IN-CHAIN TO IN-NEXT.
       END METHOD SET-NEXT.
       
       IDENTIFICATION DIVISION.
       METHOD-ID. PROCESS-REQUEST.
       DATA DIVISION.
       LINKAGE SECTION.
       01 REQ-SEVERITY PIC 9(2).
       PROCEDURE DIVISION USING REQ-SEVERITY.
           IF REQ-SEVERITY <= LICH-RANK THEN
               DISPLAY "Request devoured by Lich of rank " LICH-RANK
           ELSE
               IF NEXT-IN-CHAIN NOT = NULL THEN
                   INVOKE NEXT-IN-CHAIN "PROCESS-REQUEST" USING REQ-SEVERITY
               ELSE
                   DISPLAY "Request has reached the Abyss. Unhandled."
               END-IF
           END-IF.
       END METHOD PROCESS-REQUEST.
       
       END OBJECT.
       END CLASS LICH-APPROVER.
tags: [necromancy, mainframe, gof, behavioral]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

In the shadowed halls of corporate governance, no single entity wants to make a decision unless forced. The Chain of Responsibility pattern strings together a series of Liches. A request is passed from one decaying hand to the next. If a Lich's rank is sufficient, it consumes the request; otherwise, it is cast further down the chain until it either finds an overseer or falls into the Abyss.
