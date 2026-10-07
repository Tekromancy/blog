---
title: "The Strategy: The Warlord's Tactics"
description: "Defining a family of algorithms, encapsulating each one, and making them interchangeable."
type: "arnoldc"
gofPattern: "Strategy"
gofCategory: "Behavioral"
arcaneSchool: "Divination // Tactics"
formula: |2
  IT'S SHOWTIME
  
  LISTEN TO ME VERY CAREFULLY STRATEGY_STEALTH
  GIVE THESE PEOPLE AIR
  TALK TO THE HAND "Executing stealth approach. Active camo ON."
  I'LL BE BACK 0
  HASTA LA VISTA, BABY
  
  LISTEN TO ME VERY CAREFULLY STRATEGY_ASSAULT
  GIVE THESE PEOPLE AIR
  TALK TO THE HAND "Executing full frontal assault. Guns blazing!"
  I'LL BE BACK 1
  HASTA LA VISTA, BABY
  
  LISTEN TO ME VERY CAREFULLY EXECUTE_TACTIC
  I NEED YOUR CLOTHES YOUR BOOTS AND YOUR MOTORCYCLE TACTIC_ID
  GIVE THESE PEOPLE AIR
  I NEED YOUR CLOTHES YOUR BOOTS AND YOUR MOTORCYCLE DUMMY
  
  BECAUSE I'M GOING TO SAY PLEASE TACTIC_ID
    GET YOUR ASS TO MARS DUMMY
    DO IT NOW STRATEGY_ASSAULT
  BULLSHIT
    GET YOUR ASS TO MARS DUMMY
    DO IT NOW STRATEGY_STEALTH
  YOU HAVE NO RESPECT FOR LOGIC
  
  I'LL BE BACK 0
  HASTA LA VISTA, BABY
  
  I NEED YOUR CLOTHES YOUR BOOTS AND YOUR MOTORCYCLE RESULT
  
  TALK TO THE HAND "Commander ordered plan Alpha (0):"
  GET YOUR ASS TO MARS RESULT
  DO IT NOW EXECUTE_TACTIC 0
  
  TALK TO THE HAND "Commander ordered plan Omega (1):"
  GET YOUR ASS TO MARS RESULT
  DO IT NOW EXECUTE_TACTIC 1
  
  YOU HAVE BEEN TERMINATED
tags: ["behavioral", "strategy", "arnoldc", "tactics"]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: "Apprentice"
---

# The Strategy: The Warlord's Tactics

You don't sneak into a fortress with a rocket launcher, and you don't fight a tank with a silencer. The Strategy pattern defines a family of algorithms, encapsulates each one, and makes them interchangeable. Strategy lets the algorithm vary independently from clients that use it.

Through ArnoldC, the context `EXECUTE_TACTIC` receives the algorithm ID. It easily swaps out the execution behavior at runtime, meaning the Warlord can change from stealth to total war in the blink of a cybernetic eye.
