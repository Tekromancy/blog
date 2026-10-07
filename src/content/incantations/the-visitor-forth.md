---
title: Visitor (Forth)
description: Dispatch an ethereal form to inspect the internal structures.
type: forth
gofPattern: Visitor
gofCategory: Behavioral
arcaneSchool: Divination // Ethereal-Projection
formula: |
  \ Ethereal-Projection: The Visitor
  \ Applying a dispatched XT over a typed entity.
  
  \ Data structure: [TYPE] [VALUE]
  CREATE ENTITY-1 1 , 100 ,
  CREATE ENTITY-2 2 , 50 ,
  
  : BUFF-VISITOR ( type val -- )
    SWAP 1 = IF
      ." Buffing Warrior. Str +10." CR DROP
    ELSE
      ." Buffing Mage. Int +10." CR DROP
    THEN ;
    
  : ACCEPT-VISITOR ( entity-addr visitor-xt -- )
    SWAP DUP @ SWAP CELL+ @  ( xt type val )
    ROT EXECUTE ;
    
  \ Usage:
  \ ENTITY-1 ' BUFF-VISITOR ACCEPT-VISITOR
  \ ENTITY-2 ' BUFF-VISITOR ACCEPT-VISITOR
tags: [behavioral, visitor, forth, ethereal]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

When the structure of a dark construct cannot be modified, one must project an ethereal form inside. The Visitor takes the form of an Execution Token (`XT`), passed into the core memory of an object, reading its type-tag and applying arbitrary logic without altering the construct's class definition.
