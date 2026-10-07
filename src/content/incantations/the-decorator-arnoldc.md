---
title: "The Decorator: Cyber-Augmentation"
description: "Attaching additional responsibilities to an object dynamically."
type: "arnoldc"
gofPattern: "Decorator"
gofCategory: "Structural"
arcaneSchool: "Transmutation // Enhancement"
formula: |2
  IT'S SHOWTIME
  
  LISTEN TO ME VERY CAREFULLY BASE_ATTACK
  I NEED YOUR CLOTHES YOUR BOOTS AND YOUR MOTORCYCLE DAMAGE
  GIVE THESE PEOPLE AIR
  TALK TO THE HAND "Base strike damage:"
  TALK TO THE HAND DAMAGE
  I'LL BE BACK DAMAGE
  HASTA LA VISTA, BABY
  
  LISTEN TO ME VERY CAREFULLY FIRE_DECORATOR
  I NEED YOUR CLOTHES YOUR BOOTS AND YOUR MOTORCYCLE PREV_DAMAGE
  GIVE THESE PEOPLE AIR
  I NEED YOUR CLOTHES YOUR BOOTS AND YOUR MOTORCYCLE NEW_DAMAGE
  GET TO THE CHOPPER NEW_DAMAGE
  HERE IS MY INVITATION PREV_DAMAGE
  GET UP 50
  ENOUGH TALK
  TALK TO THE HAND "Applying incendiary rounds."
  I'LL BE BACK NEW_DAMAGE
  HASTA LA VISTA, BABY
  
  I NEED YOUR CLOTHES YOUR BOOTS AND YOUR MOTORCYCLE TOTAL_DMG
  GET YOUR ASS TO MARS TOTAL_DMG
  DO IT NOW BASE_ATTACK 100
  
  GET YOUR ASS TO MARS TOTAL_DMG
  DO IT NOW FIRE_DECORATOR TOTAL_DMG
  
  TALK TO THE HAND "Final output damage:"
  TALK TO THE HAND TOTAL_DMG
  
  YOU HAVE BEEN TERMINATED
tags: ["structural", "decorator", "arnoldc", "augmentation"]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: "Apprentice"
---

# The Decorator: Cyber-Augmentation

A raw strike is brutal, but a strike wreathed in techno-fire is lethal. The Decorator pattern lets you attach new behaviors to objects by placing these objects inside special wrapper objects that contain the behaviors.

In ArnoldC, we pass the results of our base actions into decorator subroutines. These modifiers mutate the payload and augment the output. There is no need to modify the base attack function; we simply slap more firepower on top of it.
