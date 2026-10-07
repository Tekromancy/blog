---
title: Iterator (Forth)
description: Walk the graveyard of memory, touching every tombstone.
type: forth
gofPattern: Iterator
gofCategory: Behavioral
arcaneSchool: Necromancy // Grave-Walking
formula: |
  \ Grave-Walking: The Iterator
  \ Passing an XT to map over contiguous memory blocks.
  
  CREATE SOUL-ARRAY 10 , 20 , 30 ,
  
  : FOR-EACH-SOUL ( xt array len -- )
    0 ?DO
      DUP I CELLS + @   \ Fetch value
      OVER EXECUTE      \ Execute XT with value
    LOOP
    2DROP ;
    
  : PURGE-SOUL ( val -- )
    ." Purging soul with essence " . CR ;
    
  \ Usage:
  \ ' PURGE-SOUL SOUL-ARRAY 3 FOR-EACH-SOUL
tags: [behavioral, iterator, forth, memory-walking]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

To traverse a collection in the deep stack, we don't build complex object hierarchies. The Iterator accepts an array bounds and an Execution Token (`XT`). It traverses the pointers, invoking the spell against each isolated fragment of memory.
