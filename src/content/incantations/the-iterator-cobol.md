---
title: The Iterator of the Damned Array
description: Sequentially traversing a collection of cursed artifacts without exposing the underlying memory layout.
type: cobol
gofPattern: Iterator
gofCategory: Behavioral
arcaneSchool: Necromancy // Corp-mancy
formula: |
       IDENTIFICATION DIVISION.
       CLASS-ID. GRAVEYARD-ITERATOR INHERITS BASE-ITERATOR.
       
       ENVIRONMENT DIVISION.
       CONFIGURATION SECTION.
       REPOSITORY.
           CLASS BASE-ITERATOR IS "BaseIterator"
           CLASS GRAVEYARD-COLLECTION IS "GraveyardCollection"
           CLASS UNDEAD-ENTITY IS "UndeadEntity".
           
       OBJECT.
       DATA DIVISION.
       WORKING-STORAGE SECTION.
       01 COLLECTION OBJECT REFERENCE GRAVEYARD-COLLECTION.
       01 CURRENT-POS PIC 9(4) VALUE 0.
       
       PROCEDURE DIVISION.
       
       IDENTIFICATION DIVISION.
       METHOD-ID. NEW.
       DATA DIVISION.
       LINKAGE SECTION.
       01 IN-COLLECTION OBJECT REFERENCE GRAVEYARD-COLLECTION.
       PROCEDURE DIVISION USING IN-COLLECTION.
           SET COLLECTION TO IN-COLLECTION.
       END METHOD NEW.
       
       IDENTIFICATION DIVISION.
       METHOD-ID. HAS-NEXT.
       DATA DIVISION.
       LINKAGE SECTION.
       01 RET-BOOL PIC X.
       PROCEDURE DIVISION RETURNING RET-BOOL.
           IF CURRENT-POS < COLLECTION::"COUNT" THEN
               MOVE 'Y' TO RET-BOOL
           ELSE
               MOVE 'N' TO RET-BOOL
           END-IF.
       END METHOD HAS-NEXT.
       
       IDENTIFICATION DIVISION.
       METHOD-ID. GET-NEXT.
       DATA DIVISION.
       LINKAGE SECTION.
       01 RET-ENTITY OBJECT REFERENCE UNDEAD-ENTITY.
       PROCEDURE DIVISION RETURNING RET-ENTITY.
           INVOKE COLLECTION "GET-AT" USING CURRENT-POS RETURNING RET-ENTITY.
           ADD 1 TO CURRENT-POS.
       END METHOD GET-NEXT.
       
       END OBJECT.
       END CLASS GRAVEYARD-ITERATOR.
tags: [necromancy, mainframe, gof, behavioral]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Iterator is a blind guide through the Catacombs of Data. It permits the necromancer to touch every single corpse in a collection sequentially, without needing to know if they are buried in an array, a linked list, or a multidimensional void matrix.
