---
title: The Singleton of the Root Administrator
description: Ensuring only one absolute master of the realm exists within the mainframe's memory cores.
type: cobol
gofPattern: Singleton
gofCategory: Creational
arcaneSchool: "Necromancy // Corp-mancy"
formula: |2
  IDENTIFICATION DIVISION.
  CLASS-ID. ROOT-ADMIN INHERITS BASE-DAEMON.

  ENVIRONMENT DIVISION.
  CONFIGURATION SECTION.
  REPOSITORY.
      CLASS BASE-DAEMON IS "System.Object".

  IDENTIFICATION DIVISION.
  FACTORY.
  DATA DIVISION.
  WORKING-STORAGE SECTION.
  01 THE-INSTANCE OBJECT REFERENCE ROOT-ADMIN VALUE NULL.

  PROCEDURE DIVISION.

  IDENTIFICATION DIVISION.
  METHOD-ID. GET-INSTANCE.
  DATA DIVISION.
  LINKAGE SECTION.
  01 RET-INSTANCE OBJECT REFERENCE ROOT-ADMIN.
  PROCEDURE DIVISION RETURNING RET-INSTANCE.
      IF THE-INSTANCE = NULL THEN
          INVOKE ROOT-ADMIN "NEW" RETURNING THE-INSTANCE
      END-IF.
      SET RET-INSTANCE TO THE-INSTANCE.
  END METHOD GET-INSTANCE.

  END FACTORY.
  END CLASS ROOT-ADMIN.
tags: [necromancy, mainframe, gof, creational]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The realm of the mainframe can only tolerate a single Root Administrator. Multiple masters invite catastrophic deadlocks and corrupted souls. The Singleton pattern enforces an ancient decree: should a second invocation of the master be attempted, the original dark lord shall simply manifest again.
