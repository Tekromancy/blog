---
title: "The Iterator: Traversing the Trunk Groups"
description: "Sequentially accessing the esoteric elements of a telecom trunk without exposing its underlying matrix."
type: chill
gofPattern: Iterator
gofCategory: Behavioral
arcaneSchool: "Divination // Scrying"
formula: |2
  ITERATOR_HEX: MODULE
    GRANT GET_NEXT, HAS_MORE, RESET_ITERATOR;
    
    DCL trunk_lines ARRAY (1:50) INT;
    DCL current_pos INT INIT := 1;
    
    /* Hidden initialization of the trunk matrix */
    
    RESET_ITERATOR: PROCEDURE ();
      current_pos := 1;
    END RESET_ITERATOR;
    
    HAS_MORE: PROCEDURE () RETURNS (BOOL);
      RETURN current_pos <= 50;
    END HAS_MORE;
    
    GET_NEXT: PROCEDURE () RETURNS (INT);
      DCL line INT;
      line := trunk_lines(current_pos);
      current_pos := current_pos + 1;
      RETURN line;
    END GET_NEXT;
  END ITERATOR_HEX;
tags: [telecom, chill, iterator, scrying, switching-hexes]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

The Iterator hex provides a way to access the elements of an aggregate object sequentially without exposing its underlying representation. Whether the telecom trunk lines are stored as a flat array, a linked crystal chain, or a multi-dimensional aether-tensor, the Iterator conceals these details. The scrying magus simply calls `HAS_MORE` and `GET_NEXT`, peacefully stepping through the active lines.
