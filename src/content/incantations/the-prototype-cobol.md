---
title: The Prototype of the Doppelganger Subroutine
description: Cloning an existing spirit of the mainframe to avoid the costly rites of a fresh summoning.
type: cobol
gofPattern: Prototype
gofCategory: Creational
arcaneSchool: "Necromancy // Corp-mancy"
formula: |2
  IDENTIFICATION DIVISION.
  CLASS-ID. DOPPELGANGER INHERITS BASE-DAEMON.

  ENVIRONMENT DIVISION.
  CONFIGURATION SECTION.
  REPOSITORY.
      CLASS BASE-DAEMON IS "System.Object".

  OBJECT.
  DATA DIVISION.
  WORKING-STORAGE SECTION.
  01 ECTOPLASM-SIGNATURE PIC X(50).

  PROCEDURE DIVISION.

  IDENTIFICATION DIVISION.
  METHOD-ID. CLONE.
  DATA DIVISION.
  WORKING-STORAGE SECTION.
  01 NEW-ENTITY OBJECT REFERENCE DOPPELGANGER.
  LINKAGE SECTION.
  01 RET-CLONE OBJECT REFERENCE DOPPELGANGER.
  PROCEDURE DIVISION RETURNING RET-CLONE.
      INVOKE DOPPELGANGER "NEW" RETURNING NEW-ENTITY.
      INVOKE NEW-ENTITY "SET-SIGNATURE" USING ECTOPLASM-SIGNATURE.
      SET RET-CLONE TO NEW-ENTITY.
  END METHOD CLONE.

  IDENTIFICATION DIVISION.
  METHOD-ID. SET-SIGNATURE.
  DATA DIVISION.
  LINKAGE SECTION.
  01 IN-SIG PIC X(50).
  PROCEDURE DIVISION USING IN-SIG.
      MOVE IN-SIG TO ECTOPLASM-SIGNATURE.
  END METHOD SET-SIGNATURE.

  END OBJECT.
  END CLASS DOPPELGANGER.
tags: [necromancy, mainframe, gof, creational]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

Why expend precious life force to conjure a daemon from scratch when you can simply cleave an existing one in twain? The Prototype pattern duplicates the ectoplasmic signature of a running subroutine, creating a perfect, immediately usable clone to process the endless queues.
