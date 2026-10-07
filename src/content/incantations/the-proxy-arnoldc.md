---
title: "The Proxy: The Meat Shield"
description: "Providing a surrogate or placeholder to control access to the true target."
type: "arnoldc"
gofPattern: "Proxy"
gofCategory: "Structural"
arcaneSchool: "Abjuration // Warding"
formula: |2
  IT'S SHOWTIME
  
  LISTEN TO ME VERY CAREFULLY REAL_TARGET_HIT
  GIVE THESE PEOPLE AIR
  TALK TO THE HAND "Critical damage! The core is breached!"
  I'LL BE BACK 1
  HASTA LA VISTA, BABY
  
  LISTEN TO ME VERY CAREFULLY PROXY_SHIELD
  I NEED YOUR CLOTHES YOUR BOOTS AND YOUR MOTORCYCLE SHIELD_HP
  GIVE THESE PEOPLE AIR
  I NEED YOUR CLOTHES YOUR BOOTS AND YOUR MOTORCYCLE DUMMY
  
  BECAUSE I'M GOING TO SAY PLEASE SHIELD_HP
    TALK TO THE HAND "Proxy shield absorbed the impact."
    I'LL BE BACK 0
  BULLSHIT
    TALK TO THE HAND "Shield offline! Forwarding attack to core..."
    GET YOUR ASS TO MARS DUMMY
    DO IT NOW REAL_TARGET_HIT
    I'LL BE BACK 1
  YOU HAVE NO RESPECT FOR LOGIC
  
  HASTA LA VISTA, BABY
  
  I NEED YOUR CLOTHES YOUR BOOTS AND YOUR MOTORCYCLE RESULT
  
  TALK TO THE HAND "Incoming attack 1 (Shields UP):"
  GET YOUR ASS TO MARS RESULT
  DO IT NOW PROXY_SHIELD 1
  
  TALK TO THE HAND "Incoming attack 2 (Shields DOWN):"
  GET YOUR ASS TO MARS RESULT
  DO IT NOW PROXY_SHIELD 0
  
  YOU HAVE BEEN TERMINATED
tags: ["structural", "proxy", "arnoldc", "defense"]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: "Adept"
---

# The Proxy: The Meat Shield

Why take a bullet when a surrogate can intercept it? The Proxy pattern provides an object that acts as a substitute for a real subject. A proxy controls access to the original object, allowing you to perform something either before or after the request gets through.

In this ArnoldC simulation, a proxy subroutine acts as a kinetic shield. If the shield's hit points are up, it absorbs the attack. If the proxy fails, it forwards the destructive invocation directly to the fragile core system.
