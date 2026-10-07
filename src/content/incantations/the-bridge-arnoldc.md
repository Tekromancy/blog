---
title: "The Bridge: Severing the Hierarchy"
description: "Decoupling an abstraction from its implementation so the two can vary independently, like a warrior and their weapon."
type: "arnoldc"
gofPattern: "Bridge"
gofCategory: "Structural"
arcaneSchool: "Abjuration // Tethering"
formula: |2
  IT'S SHOWTIME
  
  LISTEN TO ME VERY CAREFULLY IMPLEMENTOR_MELEE
  GIVE THESE PEOPLE AIR
  TALK TO THE HAND "Swinging chainsword!"
  I'LL BE BACK 1
  HASTA LA VISTA, BABY
  
  LISTEN TO ME VERY CAREFULLY IMPLEMENTOR_RANGED
  GIVE THESE PEOPLE AIR
  TALK TO THE HAND "Firing plasma bolts!"
  I'LL BE BACK 2
  HASTA LA VISTA, BABY
  
  LISTEN TO ME VERY CAREFULLY ABSTRACTION_WARRIOR
  I NEED YOUR CLOTHES YOUR BOOTS AND YOUR MOTORCYCLE WEAPON_TYPE
  GIVE THESE PEOPLE AIR
  I NEED YOUR CLOTHES YOUR BOOTS AND YOUR MOTORCYCLE DUMMY
  
  BECAUSE I'M GOING TO SAY PLEASE WEAPON_TYPE
    GET YOUR ASS TO MARS DUMMY
    DO IT NOW IMPLEMENTOR_MELEE
  BULLSHIT
    GET YOUR ASS TO MARS DUMMY
    DO IT NOW IMPLEMENTOR_RANGED
  YOU HAVE NO RESPECT FOR LOGIC
  
  I'LL BE BACK 0
  HASTA LA VISTA, BABY
  
  I NEED YOUR CLOTHES YOUR BOOTS AND YOUR MOTORCYCLE DUMMY_VAR
  GET YOUR ASS TO MARS DUMMY_VAR
  DO IT NOW ABSTRACTION_WARRIOR 1
  
  GET YOUR ASS TO MARS DUMMY_VAR
  DO IT NOW ABSTRACTION_WARRIOR 0
  
  YOU HAVE BEEN TERMINATED
tags: ["structural", "bridge", "arnoldc", "abjuration"]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: "Adept"
---

# The Bridge: Severing the Hierarchy

A warrior is not defined by the weapon they hold, nor is the weapon defined by the flesh that wields it. The Bridge pattern divides business logic or a huge class into separate class hierarchies that can be developed independently.

In this ArnoldC ritual, our warrior abstraction takes an implementation identifier. It seamlessly delegates the violence to either a melee or ranged implementor. The warrior does not care *how* the damage is dealt, only that the enemy is eradicated.
