---
title: The Visitor of the Astral Projection
description: Separating an algorithm from the object structure on which it operates, traversing nodes like a specter.
type: cobol
gofPattern: Visitor
gofCategory: Behavioral
arcaneSchool: Necromancy // Corp-mancy
formula: |
       IDENTIFICATION DIVISION.
       CLASS-ID. SOUL-REAPER-VISITOR INHERITS I-VISITOR.
       
       ENVIRONMENT DIVISION.
       CONFIGURATION SECTION.
       REPOSITORY.
           CLASS I-VISITOR IS "IVisitor"
           CLASS THRALL-NODE IS "ThrallNode"
           CLASS DEMON-NODE IS "DemonNode".
           
       OBJECT.
       PROCEDURE DIVISION.
       
       IDENTIFICATION DIVISION.
       METHOD-ID. VISIT-THRALL.
       DATA DIVISION.
       LINKAGE SECTION.
       01 TARGET-NODE OBJECT REFERENCE THRALL-NODE.
       PROCEDURE DIVISION USING TARGET-NODE.
           DISPLAY "Reaping a minor thrall's life force...".
           INVOKE TARGET-NODE "DRAIN-HP" USING 50.
       END METHOD VISIT-THRALL.
       
       IDENTIFICATION DIVISION.
       METHOD-ID. VISIT-DEMON.
       DATA DIVISION.
       LINKAGE SECTION.
       01 TARGET-NODE OBJECT REFERENCE DEMON-NODE.
       PROCEDURE DIVISION USING TARGET-NODE.
           DISPLAY "Negotiating pact to reap demonic energy...".
           INVOKE TARGET-NODE "DRAIN-HP" USING 500.
       END METHOD VISIT-DEMON.
       
       END OBJECT.
       END CLASS SOUL-REAPER-VISITOR.
tags: [necromancy, mainframe, gof, behavioral]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

When the structure of a dark hierarchy is solidified and rigid, adding new operations to the entities is perilous. The Visitor pattern resolves this by sending an Astral Projection (the Visitor) to pass through the object tree. The nodes accept the visitor and pass themselves to its methods, allowing complex reaping operations without polluting the node classes themselves.
