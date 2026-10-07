---
title: "The Flyweight: Sharing the Matrix"
description: "Minimizing memory usage by sharing as much data as possible among the swarm."
type: "arnoldc"
gofPattern: "Flyweight"
gofCategory: "Structural"
arcaneSchool: "Illusion // Matrix"
formula: |2
  IT'S SHOWTIME
  
  I NEED YOUR CLOTHES YOUR BOOTS AND YOUR MOTORCYCLE SHARED_TEXTURE
  GET TO THE CHOPPER SHARED_TEXTURE
  HERE IS MY INVITATION 999
  ENOUGH TALK
  
  LISTEN TO ME VERY CAREFULLY RENDER_DRONE
  I NEED YOUR CLOTHES YOUR BOOTS AND YOUR MOTORCYCLE DRONE_ID
  I NEED YOUR CLOTHES YOUR BOOTS AND YOUR MOTORCYCLE POS_X
  I NEED YOUR CLOTHES YOUR BOOTS AND YOUR MOTORCYCLE TEXTURE_REF
  GIVE THESE PEOPLE AIR
  TALK TO THE HAND "Rendering Drone ID:"
  TALK TO THE HAND DRONE_ID
  TALK TO THE HAND "At Position X:"
  TALK TO THE HAND POS_X
  TALK TO THE HAND "Using Shared Texture:"
  TALK TO THE HAND TEXTURE_REF
  I'LL BE BACK 0
  HASTA LA VISTA, BABY
  
  I NEED YOUR CLOTHES YOUR BOOTS AND YOUR MOTORCYCLE DUMMY
  
  GET YOUR ASS TO MARS DUMMY
  DO IT NOW RENDER_DRONE 1 10 SHARED_TEXTURE
  
  GET YOUR ASS TO MARS DUMMY
  DO IT NOW RENDER_DRONE 2 20 SHARED_TEXTURE
  
  GET YOUR ASS TO MARS DUMMY
  DO IT NOW RENDER_DRONE 3 30 SHARED_TEXTURE
  
  TALK TO THE HAND "Swarm rendered efficiently."
  YOU HAVE BEEN TERMINATED
tags: ["structural", "flyweight", "arnoldc", "optimization"]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: "Adept"
---

# The Flyweight: Sharing the Matrix

When rendering ten thousand killer drones, storing the heavy structural blueprint inside every single unit will crash the neural net. The Flyweight pattern reuses existing instances or data states where possible to save memory.

Using ArnoldC, we demonstrate this by holding our heavy data (`SHARED_TEXTURE`) in a single variable. When it is time to deploy the drones, we pass the reference to this shared memory instead of duplicating the blueprint, enabling infinite scaling of our swarm.
