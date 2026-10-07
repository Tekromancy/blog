---
title: Mediator (Forth)
description: A central sigil to route the chaos of warring spirits.
type: forth
gofPattern: Mediator
gofCategory: Behavioral
arcaneSchool: Enchantment // Sigil-Routing
formula: |
  \ Sigil-Routing: The Mediator
  \ A hub word that dictates interactions between systems.
  
  VARIABLE FIRE-POWER
  VARIABLE WATER-POWER
  
  : MEDIATE-ELEMENTS ( -- )
    FIRE-POWER @ WATER-POWER @ > IF
      ." Fire consumes the Water." CR
      0 WATER-POWER !
    ELSE
      ." Water extinguishes the Fire." CR
      0 FIRE-POWER !
    THEN ;
    
  : FEED-FIRE ( n -- )
    FIRE-POWER +! MEDIATE-ELEMENTS ;
    
  : FEED-WATER ( n -- )
    WATER-POWER +! MEDIATE-ELEMENTS ;
    
  \ Usage:
  \ 10 FEED-FIRE
  \ 20 FEED-WATER
tags: [behavioral, mediator, forth, routing]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

When independent modules (or elements) grow too interconnected, chaos ensues. The Mediator is a singular, central word that handles the routing and collision of systems. Rather than letting the fire directly quench the water, both report to the Mediator.
