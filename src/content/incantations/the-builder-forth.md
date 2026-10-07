---
title: Builder (Forth)
description: Piece together a chimera on the data stack, limb by limb.
type: forth
gofPattern: Builder
gofCategory: Creational
arcaneSchool: Transmutation // Fleshcrafting
formula: |
  \ Fleshcrafting: The Builder Pattern
  \ Instead of complex constructors, we mutate a structure iteratively.
  
  VARIABLE CHIMERA-STATE
  
  : NEW-CHIMERA ( -- )
    0 CHIMERA-STATE ! ." A formless mass is prepared." CR ;
    
  : ADD-CLAWS ( -- )
    CHIMERA-STATE @ 1+ CHIMERA-STATE ! ." Claws grafted." CR ;
    
  : ADD-WINGS ( -- )
    CHIMERA-STATE @ 2 + CHIMERA-STATE ! ." Wings bound." CR ;
    
  : AWAKEN ( -- )
    ." The Chimera breathes. Power level: " CHIMERA-STATE @ . CR ;
    
  \ Usage:
  \ NEW-CHIMERA ADD-CLAWS ADD-WINGS AWAKEN
tags: [creational, builder, forth, fleshcrafting]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Builder pattern in Forth is pure fluent interface. As words execute sequentially, they pull the developing construct from the stack or global state, shape it, and leave it ready for the next invocation.
