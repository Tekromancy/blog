---
title: The Flyweight of the Endless Souls
description: Conserving precious mainframe memory by sharing the intrinsic properties of countless lesser spirits.
type: cobol
gofPattern: Flyweight
gofCategory: Structural
arcaneSchool: "Necromancy // Corp-mancy"
formula: |2
  IDENTIFICATION DIVISION.
  CLASS-ID. SOUL-FLYWEIGHT INHERITS BASE-DAEMON.

  ENVIRONMENT DIVISION.
  CONFIGURATION SECTION.
  REPOSITORY.
      CLASS BASE-DAEMON IS "System.Object".

  OBJECT.
  DATA DIVISION.
  WORKING-STORAGE SECTION.
  * Intrinsic state shared among all instances of this type
  01 TORMENT-TYPE PIC X(20).

  PROCEDURE DIVISION.

  IDENTIFICATION DIVISION.
  METHOD-ID. NEW.
  DATA DIVISION.
  LINKAGE SECTION.
  01 IN-TYPE PIC X(20).
  PROCEDURE DIVISION USING IN-TYPE.
      MOVE IN-TYPE TO TORMENT-TYPE.
  END METHOD NEW.

  IDENTIFICATION DIVISION.
  METHOD-ID. MANIFEST.
  DATA DIVISION.
  LINKAGE SECTION.
  * Extrinsic state passed in by the client
  01 SECTOR-ID PIC X(10).
  PROCEDURE DIVISION USING SECTOR-ID.
      DISPLAY "Manifesting soul with torment " TORMENT-TYPE
              " at sector " SECTOR-ID.
  END METHOD MANIFEST.

  END OBJECT.
  END CLASS SOUL-FLYWEIGHT.
tags: [necromancy, mainframe, gof, structural]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

When commanding an army of a million restless souls to audit the midnight batch jobs, memory allocation becomes a dire concern. The Flyweight pattern strips the souls of their unique positional data, storing only the shared essence of their torment. The exact sector they haunt is passed at the moment of manifestation.
