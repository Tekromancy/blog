---
title: "The Chain of Responsibility: Passing the Blame"
description: "Passing a request along a chain of handlers until one terminates the target."
type: "arnoldc"
gofPattern: "Chain of Responsibility"
gofCategory: "Behavioral"
arcaneSchool: "Evocation // Relays"
formula: |2
  IT'S SHOWTIME
  
  LISTEN TO ME VERY CAREFULLY HEAVY_HANDLER
  I NEED YOUR CLOTHES YOUR BOOTS AND YOUR MOTORCYCLE THREAT_LEVEL
  GIVE THESE PEOPLE AIR
  I NEED YOUR CLOTHES YOUR BOOTS AND YOUR MOTORCYCLE HANDLED
  GET TO THE CHOPPER HANDLED
  HERE IS MY INVITATION 0
  ENOUGH TALK
  
  I NEED YOUR CLOTHES YOUR BOOTS AND YOUR MOTORCYCLE IS_HEAVY
  GET TO THE CHOPPER IS_HEAVY
  HERE IS MY INVITATION THREAT_LEVEL
  LET OFF SOME STEAM BENNET 10
  ENOUGH TALK
  
  BECAUSE I'M GOING TO SAY PLEASE IS_HEAVY
    TALK TO THE HAND "Heavy Handler: Threat neutralized."
    GET TO THE CHOPPER HANDLED
    HERE IS MY INVITATION 1
    ENOUGH TALK
  BULLSHIT
    TALK TO THE HAND "Heavy Handler: Threat too small. Escaping."
  YOU HAVE NO RESPECT FOR LOGIC
  I'LL BE BACK HANDLED
  HASTA LA VISTA, BABY
  
  LISTEN TO ME VERY CAREFULLY LIGHT_HANDLER
  I NEED YOUR CLOTHES YOUR BOOTS AND YOUR MOTORCYCLE THREAT_LEVEL
  GIVE THESE PEOPLE AIR
  TALK TO THE HAND "Light Handler: Target acquired."
  TALK TO THE HAND "Light Handler: Threat neutralized."
  I'LL BE BACK 1
  HASTA LA VISTA, BABY
  
  LISTEN TO ME VERY CAREFULLY CHAIN_START
  I NEED YOUR CLOTHES YOUR BOOTS AND YOUR MOTORCYCLE THREAT
  GIVE THESE PEOPLE AIR
  I NEED YOUR CLOTHES YOUR BOOTS AND YOUR MOTORCYCLE RESULT
  GET YOUR ASS TO MARS RESULT
  DO IT NOW HEAVY_HANDLER THREAT
  
  I NEED YOUR CLOTHES YOUR BOOTS AND YOUR MOTORCYCLE FAILED
  GET TO THE CHOPPER FAILED
  HERE IS MY INVITATION RESULT
  LET OFF SOME STEAM BENNET 1
  ENOUGH TALK
  
  BECAUSE I'M GOING TO SAY PLEASE FAILED
    GET YOUR ASS TO MARS RESULT
    DO IT NOW LIGHT_HANDLER THREAT
  BULLSHIT
    TALK TO THE HAND "Chain complete."
  YOU HAVE NO RESPECT FOR LOGIC
  
  I'LL BE BACK RESULT
  HASTA LA VISTA, BABY
  
  I NEED YOUR CLOTHES YOUR BOOTS AND YOUR MOTORCYCLE FINAL
  
  TALK TO THE HAND "Processing threat level 50:"
  GET YOUR ASS TO MARS FINAL
  DO IT NOW CHAIN_START 50
  
  TALK TO THE HAND "Processing threat level 5:"
  GET YOUR ASS TO MARS FINAL
  DO IT NOW CHAIN_START 5
  
  YOU HAVE BEEN TERMINATED
tags: ["behavioral", "chain-of-responsibility", "arnoldc", "relays"]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: "Adept"
---

# The Chain of Responsibility: Passing the Blame

When an unknown cyber-threat infiltrates the perimeter, you do not send the grand arbiter to squash a bug. You pass the threat down the line. The Chain of Responsibility pattern lets you pass requests along a chain of handlers. Upon receiving a request, each handler decides either to process it or to pass it to the next handler in the chain.

In this ArnoldC chain, the `HEAVY_HANDLER` evaluates the threat. If the threat level is too low, it fails, forcing our `CHAIN_START` logic to pass the baton down to the `LIGHT_HANDLER`.
