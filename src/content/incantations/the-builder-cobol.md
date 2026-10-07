---
title: The Builder of the Monolith
description: Assembling complex corporate entities from the ground up, ritual by ritual, division by division.
type: cobol
gofPattern: Builder
gofCategory: Creational
arcaneSchool: "Necromancy // Corp-mancy"
formula: |2
  IDENTIFICATION DIVISION.
  CLASS-ID. MONOLITH-BUILDER INHERITS BASE-DAEMON.

  ENVIRONMENT DIVISION.
  CONFIGURATION SECTION.
  REPOSITORY.
      CLASS BASE-DAEMON IS "System.Object"
      CLASS DARK-MONOLITH IS "DarkMonolith".

  OBJECT.
  DATA DIVISION.
  WORKING-STORAGE SECTION.
  01 THE-MONOLITH OBJECT REFERENCE DARK-MONOLITH.

  PROCEDURE DIVISION.

  IDENTIFICATION DIVISION.
  METHOD-ID. NEW.
  PROCEDURE DIVISION.
      INVOKE DARK-MONOLITH "NEW" RETURNING THE-MONOLITH.
  END METHOD NEW.

  IDENTIFICATION DIVISION.
  METHOD-ID. BUILD-FOUNDATION.
  PROCEDURE DIVISION.
      INVOKE THE-MONOLITH "LAY-CURSED-FOUNDATION".
  END METHOD BUILD-FOUNDATION.

  IDENTIFICATION DIVISION.
  METHOD-ID. BUILD-SACRIFICE-ALTAR.
  PROCEDURE DIVISION.
      INVOKE THE-MONOLITH "ERECT-ALTAR".
  END METHOD BUILD-SACRIFICE-ALTAR.

  IDENTIFICATION DIVISION.
  METHOD-ID. GET-MONOLITH.
  DATA DIVISION.
  LINKAGE SECTION.
  01 RET-MONOLITH OBJECT REFERENCE DARK-MONOLITH.
  PROCEDURE DIVISION RETURNING RET-MONOLITH.
      SET RET-MONOLITH TO THE-MONOLITH.
  END METHOD GET-MONOLITH.

  END OBJECT.
  END CLASS MONOLITH-BUILDER.
tags: [necromancy, mainframe, gof, creational]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

When constructing a monolithic daemon, one does not simply utter a single word of power. The Builder ritual requires meticulous steps—laying the cursed foundation, erecting the sacrifice altar, and binding the ancient transaction logs. Only then is the entity whole and ready to consume batch processes.
