---
title: Decorator (Forth)
description: Wrap a base spell in layers of chaotic metamagic.
type: forth
gofPattern: Decorator
gofCategory: Structural
arcaneSchool: Abjuration // Ward-Layering
formula: |
  \ Ward-Layering: The Decorator
  \ Extending behavior by chaining XTs.
  
  DEFER BASE-SPELL
  
  : FLAME-STRIKE ( -- ) ." Dealing 10 fire damage." CR ;
  ' FLAME-STRIKE IS BASE-SPELL
  
  \ The Decorator
  : WITH-ECHO ( xt -- )
    DUP EXECUTE
    ." (Echoing the spell...)" CR
    EXECUTE ;
    
  \ Usage:
  \ ' BASE-SPELL WITH-ECHO
tags: [structural, decorator, forth, metamagic]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

Why cast a plain curse when you can weave it with agony? The Decorator takes an Execution Token (`XT`) from the stack, wraps it in additional logic or effects, and executes the combined ritual without altering the original spell definition.
