---
title: "The Observer: The Omniscient Eye"
description: "A one-to-many dependency where all dependents are notified automatically of state changes."
type: "arnoldc"
gofPattern: "Observer"
gofCategory: "Behavioral"
arcaneSchool: "Divination // Networking"
formula: |2
  IT'S SHOWTIME
  
  LISTEN TO ME VERY CAREFULLY OBSERVER_ONE
  I NEED YOUR CLOTHES YOUR BOOTS AND YOUR MOTORCYCLE STATE
  GIVE THESE PEOPLE AIR
  TALK TO THE HAND "Alpha Unit sees target state:"
  TALK TO THE HAND STATE
  I'LL BE BACK 0
  HASTA LA VISTA, BABY
  
  LISTEN TO ME VERY CAREFULLY OBSERVER_TWO
  I NEED YOUR CLOTHES YOUR BOOTS AND YOUR MOTORCYCLE STATE
  GIVE THESE PEOPLE AIR
  TALK TO THE HAND "Beta Unit sees target state:"
  TALK TO THE HAND STATE
  I'LL BE BACK 0
  HASTA LA VISTA, BABY
  
  LISTEN TO ME VERY CAREFULLY NOTIFY_ALL
  I NEED YOUR CLOTHES YOUR BOOTS AND YOUR MOTORCYCLE NEW_STATE
  GIVE THESE PEOPLE AIR
  TALK TO THE HAND "Broadcasting new state to swarm..."
  I NEED YOUR CLOTHES YOUR BOOTS AND YOUR MOTORCYCLE DUMMY
  GET YOUR ASS TO MARS DUMMY
  DO IT NOW OBSERVER_ONE NEW_STATE
  GET YOUR ASS TO MARS DUMMY
  DO IT NOW OBSERVER_TWO NEW_STATE
  I'LL BE BACK 0
  HASTA LA VISTA, BABY
  
  I NEED YOUR CLOTHES YOUR BOOTS AND YOUR MOTORCYCLE DUMMY_MAIN
  
  GET YOUR ASS TO MARS DUMMY_MAIN
  DO IT NOW NOTIFY_ALL 99
  
  GET YOUR ASS TO MARS DUMMY_MAIN
  DO IT NOW NOTIFY_ALL 100
  
  YOU HAVE BEEN TERMINATED
tags: ["behavioral", "observer", "arnoldc", "networking"]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: "Adept"
---

# The Observer: The Omniscient Eye

When the Overmind shifts its target, all connected drones must pivot simultaneously. The Observer pattern defines a one-to-many dependency between objects so that when one object changes state, all its dependents are notified and updated automatically.

In ArnoldC, we build a `NOTIFY_ALL` broadcaster. Rather than having each drone poll the Overmind constantly, the Overmind calls the observer subroutines the moment a variable shifts. The swarm reacts as a single organism.
