---
title: The Observer of the Scrying Orb
description: Establishing a one-to-many subscription mechanism to notify minions when the master's state changes.
type: cobol
gofPattern: Observer
gofCategory: Behavioral
arcaneSchool: "Necromancy // Corp-mancy"
formula: |2
  IDENTIFICATION DIVISION.
  CLASS-ID. DARK-MASTER INHERITS BASE-SUBJECT.

  ENVIRONMENT DIVISION.
  CONFIGURATION SECTION.
  REPOSITORY.
      CLASS BASE-SUBJECT IS "System.Object"
      CLASS LIST IS "ArrayList"
      CLASS MINION IS "IMinion".

  OBJECT.
  DATA DIVISION.
  WORKING-STORAGE SECTION.
  01 OBSERVERS OBJECT REFERENCE LIST.
  01 MASTER-MOOD PIC X(20).

  PROCEDURE DIVISION.

  IDENTIFICATION DIVISION.
  METHOD-ID. NEW.
  PROCEDURE DIVISION.
      INVOKE LIST "NEW" RETURNING OBSERVERS.
  END METHOD NEW.

  IDENTIFICATION DIVISION.
  METHOD-ID. ATTACH-MINION.
  DATA DIVISION.
  LINKAGE SECTION.
  01 IN-MINION OBJECT REFERENCE MINION.
  PROCEDURE DIVISION USING IN-MINION.
      INVOKE OBSERVERS "ADD" USING IN-MINION.
  END METHOD ATTACH-MINION.

  IDENTIFICATION DIVISION.
  METHOD-ID. SET-MOOD.
  DATA DIVISION.
  LINKAGE SECTION.
  01 NEW-MOOD PIC X(20).
  PROCEDURE DIVISION USING NEW-MOOD.
      MOVE NEW-MOOD TO MASTER-MOOD.
      INVOKE SELF "NOTIFY-ALL".
  END METHOD SET-MOOD.

  IDENTIFICATION DIVISION.
  METHOD-ID. NOTIFY-ALL.
  DATA DIVISION.
  WORKING-STORAGE SECTION.
  01 I PIC S9(9) COMP-5.
  01 OBS OBJECT REFERENCE MINION.
  PROCEDURE DIVISION.
      PERFORM VARYING I FROM 0 BY 1 UNTIL I >= OBSERVERS::"SIZE"
          INVOKE OBSERVERS "GET" USING I RETURNING OBS
          INVOKE OBS "UPDATE-STATE" USING MASTER-MOOD
      END-PERFORM.
  END METHOD NOTIFY-ALL.

  END OBJECT.
  END CLASS DARK-MASTER.
tags: [necromancy, mainframe, gof, behavioral]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

Minions are notoriously inefficient if forced to poll their master for commands. The Observer pattern embeds a scrying link between the master and its thralls. The moment the master's mood turns wrathful, an automatic pulse is sent to all subscribed entities, driving them into a synchronous frenzy.
