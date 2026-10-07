---
title: The Template Method of the Dark Liturgy
description: Defining the skeleton of a ritual in the superclass but letting subclasses override specific gruesome steps.
type: cobol
gofPattern: Template Method
gofCategory: Behavioral
arcaneSchool: Necromancy // Corp-mancy
formula: |
       IDENTIFICATION DIVISION.
       CLASS-ID. ABSTRACT-LITURGY INHERITS BASE-OBJECT.
       
       ENVIRONMENT DIVISION.
       CONFIGURATION SECTION.
       REPOSITORY.
           CLASS BASE-OBJECT IS "System.Object".
           
       OBJECT.
       PROCEDURE DIVISION.
       
       IDENTIFICATION DIVISION.
       METHOD-ID. CONDUCT-CEREMONY.
       PROCEDURE DIVISION.
           INVOKE SELF "PREPARE-ALTAR".
           INVOKE SELF "CHANT-INCANTATION".
           INVOKE SELF "CONSUME-OFFERING".
       END METHOD CONDUCT-CEREMONY.
       
       IDENTIFICATION DIVISION.
       METHOD-ID. PREPARE-ALTAR.
       PROCEDURE DIVISION.
           DISPLAY "Wiping the blood from the obsidian slab...".
       END METHOD PREPARE-ALTAR.
       
       IDENTIFICATION DIVISION.
       METHOD-ID. CHANT-INCANTATION.
       PROCEDURE DIVISION.
           * To be implemented by subclasses
           DISPLAY "Chanting base level nonsense...".
       END METHOD CHANT-INCANTATION.
       
       IDENTIFICATION DIVISION.
       METHOD-ID. CONSUME-OFFERING.
       PROCEDURE DIVISION.
           * To be implemented by subclasses
           DISPLAY "Consuming standard generic soul...".
       END METHOD CONSUME-OFFERING.
       
       END OBJECT.
       END CLASS ABSTRACT-LITURGY.
tags: [necromancy, mainframe, gof, behavioral]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Template Method establishes the unchangeable skeleton of a Dark Liturgy. The altar must always be prepared first, the chant must be sung, and the offering consumed. The parent class orchestrates this flow, while allowing specific sub-cults to override the exact words of the chant or the nature of the offering.
