---
title: "The Composite: The Fractal Horde"
description: "Treating individual warriors and entire warbands uniformly."
type: "arnoldc"
gofPattern: "Composite"
gofCategory: "Structural"
arcaneSchool: "Enchantment // Hierarchy"
formula: |2
  IT'S SHOWTIME
  
  LISTEN TO ME VERY CAREFULLY EXECUTE_LEAF
  I NEED YOUR CLOTHES YOUR BOOTS AND YOUR MOTORCYCLE ID
  GIVE THESE PEOPLE AIR
  TALK TO THE HAND "Warrior attacks with ID:"
  TALK TO THE HAND ID
  I'LL BE BACK 0
  HASTA LA VISTA, BABY
  
  LISTEN TO ME VERY CAREFULLY EXECUTE_COMPOSITE
  I NEED YOUR CLOTHES YOUR BOOTS AND YOUR MOTORCYCLE COUNT
  GIVE THESE PEOPLE AIR
  I NEED YOUR CLOTHES YOUR BOOTS AND YOUR MOTORCYCLE DUMMY
  
  I NEED YOUR CLOTHES YOUR BOOTS AND YOUR MOTORCYCLE I
  GET TO THE CHOPPER I
  HERE IS MY INVITATION 0
  ENOUGH TALK
  
  STICK AROUND COUNT
    GET YOUR ASS TO MARS DUMMY
    DO IT NOW EXECUTE_LEAF I
    
    GET TO THE CHOPPER I
    HERE IS MY INVITATION I
    GET UP 1
    ENOUGH TALK
    
    GET TO THE CHOPPER COUNT
    HERE IS MY INVITATION COUNT
    GET DOWN 1
    ENOUGH TALK
  CHILL
  
  I'LL BE BACK 0
  HASTA LA VISTA, BABY
  
  I NEED YOUR CLOTHES YOUR BOOTS AND YOUR MOTORCYCLE WARBAND_STATUS
  GET YOUR ASS TO MARS WARBAND_STATUS
  DO IT NOW EXECUTE_COMPOSITE 3
  
  TALK TO THE HAND "Warband assault complete."
  YOU HAVE BEEN TERMINATED
tags: ["structural", "composite", "arnoldc", "hierarchy"]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: "Adept"
---

# The Composite: The Fractal Horde

To a warlord, there is no difference between ordering a single executioner to strike or ordering an entire battalion to advance. The command is the same. The Composite pattern lets clients treat individual objects and compositions of objects uniformly.

Using ArnoldC's raw iteration (`STICK AROUND`), a composite command trickles down, iterating over its constituents and triggering the attack subroutine for every sub-entity. It is the fractal nature of warfare distilled into code.
