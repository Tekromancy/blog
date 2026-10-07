---
title: "The Mediator: The Overlord's Hub"
description: "Centralizing complex communications so individual warriors don't cross their streams."
type: "arnoldc"
gofPattern: "Mediator"
gofCategory: "Behavioral"
arcaneSchool: "Enchantment // Networking"
formula: |2
  IT'S SHOWTIME
  
  LISTEN TO ME VERY CAREFULLY MEDIATOR_NOTIFY
  I NEED YOUR CLOTHES YOUR BOOTS AND YOUR MOTORCYCLE SENDER_ID
  I NEED YOUR CLOTHES YOUR BOOTS AND YOUR MOTORCYCLE EVENT_CODE
  GIVE THESE PEOPLE AIR
  
  TALK TO THE HAND "Mediator received signal from:"
  TALK TO THE HAND SENDER_ID
  
  BECAUSE I'M GOING TO SAY PLEASE EVENT_CODE
    TALK TO THE HAND "Event 1: Dispatching aerial support."
  BULLSHIT
    TALK TO THE HAND "Event 0: Falling back to defensive perimeter."
  YOU HAVE NO RESPECT FOR LOGIC
  
  I'LL BE BACK 0
  HASTA LA VISTA, BABY
  
  LISTEN TO ME VERY CAREFULLY WARRIOR_ACTION
  I NEED YOUR CLOTHES YOUR BOOTS AND YOUR MOTORCYCLE MY_ID
  I NEED YOUR CLOTHES YOUR BOOTS AND YOUR MOTORCYCLE ACTION_CODE
  GIVE THESE PEOPLE AIR
  TALK TO THE HAND "Warrior executing action."
  I NEED YOUR CLOTHES YOUR BOOTS AND YOUR MOTORCYCLE DUMMY
  GET YOUR ASS TO MARS DUMMY
  DO IT NOW MEDIATOR_NOTIFY MY_ID ACTION_CODE
  I'LL BE BACK 0
  HASTA LA VISTA, BABY
  
  I NEED YOUR CLOTHES YOUR BOOTS AND YOUR MOTORCYCLE RES
  
  GET YOUR ASS TO MARS RES
  DO IT NOW WARRIOR_ACTION 101 1
  
  GET YOUR ASS TO MARS RES
  DO IT NOW WARRIOR_ACTION 202 0
  
  YOU HAVE BEEN TERMINATED
tags: ["behavioral", "mediator", "arnoldc", "networking"]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: "Adept"
---

# The Mediator: The Overlord's Hub

When thousands of cyborgs are linked to the grid, letting them talk directly to one another creates a feedback loop of pure chaos. The Mediator pattern defines an object that encapsulates how a set of objects interact.

By forcing all `WARRIOR_ACTION` routines to report to the `MEDIATOR_NOTIFY` central hub, we enforce a strict chain of command. The warriors don't know who receives their request—they just send it to the mediator, which dynamically routes the tactical response.
