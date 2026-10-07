---
title: "The Visitor: The Invasive Audit"
description: "Representing an operation to be performed on the elements of an object structure without changing their classes."
type: "arnoldc"
gofPattern: "Visitor"
gofCategory: "Behavioral"
arcaneSchool: "Divination // Scanning"
formula: |2
  IT'S SHOWTIME
  
  LISTEN TO ME VERY CAREFULLY VISITOR_REPAIR
  I NEED YOUR CLOTHES YOUR BOOTS AND YOUR MOTORCYCLE TARGET_TYPE
  GIVE THESE PEOPLE AIR
  BECAUSE I'M GOING TO SAY PLEASE TARGET_TYPE
    TALK TO THE HAND "Repairing cyber-armor."
  BULLSHIT
    TALK TO THE HAND "Repairing flesh wounds."
  YOU HAVE NO RESPECT FOR LOGIC
  I'LL BE BACK 0
  HASTA LA VISTA, BABY
  
  LISTEN TO ME VERY CAREFULLY VISITOR_DESTROY
  I NEED YOUR CLOTHES YOUR BOOTS AND YOUR MOTORCYCLE TARGET_TYPE
  GIVE THESE PEOPLE AIR
  BECAUSE I'M GOING TO SAY PLEASE TARGET_TYPE
    TALK TO THE HAND "Melting cyber-armor with acid."
  BULLSHIT
    TALK TO THE HAND "Incinerating flesh."
  YOU HAVE NO RESPECT FOR LOGIC
  I'LL BE BACK 0
  HASTA LA VISTA, BABY
  
  LISTEN TO ME VERY CAREFULLY ACCEPT_VISITOR
  I NEED YOUR CLOTHES YOUR BOOTS AND YOUR MOTORCYCLE MY_TYPE
  I NEED YOUR CLOTHES YOUR BOOTS AND YOUR MOTORCYCLE VISITOR_ID
  GIVE THESE PEOPLE AIR
  I NEED YOUR CLOTHES YOUR BOOTS AND YOUR MOTORCYCLE DUMMY
  
  BECAUSE I'M GOING TO SAY PLEASE VISITOR_ID
    GET YOUR ASS TO MARS DUMMY
    DO IT NOW VISITOR_DESTROY MY_TYPE
  BULLSHIT
    GET YOUR ASS TO MARS DUMMY
    DO IT NOW VISITOR_REPAIR MY_TYPE
  YOU HAVE NO RESPECT FOR LOGIC
  
  I'LL BE BACK 0
  HASTA LA VISTA, BABY
  
  I NEED YOUR CLOTHES YOUR BOOTS AND YOUR MOTORCYCLE RES
  
  TALK TO THE HAND "Target: Flesh (0). Visitor: Repair (0)"
  GET YOUR ASS TO MARS RES
  DO IT NOW ACCEPT_VISITOR 0 0
  
  TALK TO THE HAND "Target: Armor (1). Visitor: Destroy (1)"
  GET YOUR ASS TO MARS RES
  DO IT NOW ACCEPT_VISITOR 1 1
  
  YOU HAVE BEEN TERMINATED
tags: ["behavioral", "visitor", "arnoldc", "scanning"]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: "Archmage"
---

# The Visitor: The Invasive Audit

Sometimes, a foreign entity must traverse the ranks of your warband, either to repair them or destroy them. The Visitor pattern represents an operation to be performed on the elements of an object structure. It lets you define a new operation without changing the classes of the elements on which it operates.

In ArnoldC, we simulate the double-dispatch. The target accepts a visitor ID, but the visitor dictates exactly what happens to the specific target type. The targets themselves never had to learn the `REPAIR` or `DESTROY` incantations—the visitor brought them.
