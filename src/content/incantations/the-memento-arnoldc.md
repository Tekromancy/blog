---
title: "The Memento: The Temporal Save-State"
description: "Capturing and restoring an object's internal state without violating encapsulation."
type: "arnoldc"
gofPattern: "Memento"
gofCategory: "Behavioral"
arcaneSchool: "Chronmancy // Save States"
formula: |2
  IT'S SHOWTIME
  
  I NEED YOUR CLOTHES YOUR BOOTS AND YOUR MOTORCYCLE HEALTH
  GET TO THE CHOPPER HEALTH
  HERE IS MY INVITATION 100
  ENOUGH TALK
  
  I NEED YOUR CLOTHES YOUR BOOTS AND YOUR MOTORCYCLE SAVED_HEALTH
  GET TO THE CHOPPER SAVED_HEALTH
  HERE IS MY INVITATION 0
  ENOUGH TALK
  
  LISTEN TO ME VERY CAREFULLY SAVE_STATE
  I NEED YOUR CLOTHES YOUR BOOTS AND YOUR MOTORCYCLE CURR_HP
  GIVE THESE PEOPLE AIR
  TALK TO THE HAND "Saving state to Memento..."
  I'LL BE BACK CURR_HP
  HASTA LA VISTA, BABY
  
  LISTEN TO ME VERY CAREFULLY RESTORE_STATE
  I NEED YOUR CLOTHES YOUR BOOTS AND YOUR MOTORCYCLE MEMENTO_HP
  GIVE THESE PEOPLE AIR
  TALK TO THE HAND "Restoring state from Memento..."
  I'LL BE BACK MEMENTO_HP
  HASTA LA VISTA, BABY
  
  TALK TO THE HAND "Current HP:"
  TALK TO THE HAND HEALTH
  
  GET YOUR ASS TO MARS SAVED_HEALTH
  DO IT NOW SAVE_STATE HEALTH
  
  TALK TO THE HAND "Taking heavy damage!"
  GET TO THE CHOPPER HEALTH
  HERE IS MY INVITATION 10
  ENOUGH TALK
  TALK TO THE HAND "Current HP:"
  TALK TO THE HAND HEALTH
  
  GET YOUR ASS TO MARS HEALTH
  DO IT NOW RESTORE_STATE SAVED_HEALTH
  
  TALK TO THE HAND "Current HP after restore:"
  TALK TO THE HAND HEALTH
  
  YOU HAVE BEEN TERMINATED
tags: ["behavioral", "memento", "arnoldc", "chronmancy"]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: "Apprentice"
---

# The Memento: The Temporal Save-State

Sometimes, the battle goes catastrophically wrong. The ability to rewind reality is a power coveted by all warlords. The Memento pattern captures and externalizes an object's internal state so that the object can be restored to this state later.

In ArnoldC, we simulate the Caretaker holding a Memento by dumping our current variables into a safe storage subroutine block. When destruction looms, we pull the cord and revert to our saved backup, defying death.
