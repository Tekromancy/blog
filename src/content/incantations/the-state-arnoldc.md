---
title: "The State: Cybernetic Bipolarity"
description: "Allowing a machine to alter its behavior when its internal state changes."
type: "arnoldc"
gofPattern: "State"
gofCategory: "Behavioral"
arcaneSchool: "Transmutation // Moods"
formula: |2
  IT'S SHOWTIME
  
  LISTEN TO ME VERY CAREFULLY STATE_IDLE
  GIVE THESE PEOPLE AIR
  TALK TO THE HAND "Machine is idling. Weapons cold."
  I'LL BE BACK 0
  HASTA LA VISTA, BABY
  
  LISTEN TO ME VERY CAREFULLY STATE_ATTACK
  GIVE THESE PEOPLE AIR
  TALK TO THE HAND "Machine is enraged! Firing everything!"
  I'LL BE BACK 1
  HASTA LA VISTA, BABY
  
  LISTEN TO ME VERY CAREFULLY HANDLE_STATE
  I NEED YOUR CLOTHES YOUR BOOTS AND YOUR MOTORCYCLE CURRENT_STATE
  GIVE THESE PEOPLE AIR
  I NEED YOUR CLOTHES YOUR BOOTS AND YOUR MOTORCYCLE DUMMY
  
  BECAUSE I'M GOING TO SAY PLEASE CURRENT_STATE
    GET YOUR ASS TO MARS DUMMY
    DO IT NOW STATE_ATTACK
  BULLSHIT
    GET YOUR ASS TO MARS DUMMY
    DO IT NOW STATE_IDLE
  YOU HAVE NO RESPECT FOR LOGIC
  
  I'LL BE BACK 0
  HASTA LA VISTA, BABY
  
  I NEED YOUR CLOTHES YOUR BOOTS AND YOUR MOTORCYCLE MACHINE_STATE
  GET TO THE CHOPPER MACHINE_STATE
  HERE IS MY INVITATION 0
  ENOUGH TALK
  
  I NEED YOUR CLOTHES YOUR BOOTS AND YOUR MOTORCYCLE RES
  
  TALK TO THE HAND "Operating normally..."
  GET YOUR ASS TO MARS RES
  DO IT NOW HANDLE_STATE MACHINE_STATE
  
  TALK TO THE HAND "Threat detected! Switching state!"
  GET TO THE CHOPPER MACHINE_STATE
  HERE IS MY INVITATION 1
  ENOUGH TALK
  
  GET YOUR ASS TO MARS RES
  DO IT NOW HANDLE_STATE MACHINE_STATE
  
  YOU HAVE BEEN TERMINATED
tags: ["behavioral", "state", "arnoldc", "finite-state-machine"]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: "Adept"
---

# The State: Cybernetic Bipolarity

A war machine in patrol mode is quiet; a war machine in combat mode is a nightmare. The State pattern allows an object to alter its behavior when its internal state changes. The object will appear to change its class.

By routing a generalized `HANDLE_STATE` function through an ArnoldC switchboard, we dynamically alter the execution path based on the `MACHINE_STATE` variable. The entity reacts entirely differently without requiring external logic to rewrite its core programming.
