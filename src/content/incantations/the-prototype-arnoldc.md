---
title: "The Prototype: Cloning the Beast"
description: "Creating new objects by cloning an existing arcane template."
type: "arnoldc"
gofPattern: "Prototype"
gofCategory: "Creational"
arcaneSchool: "Necromancy // Fleshcrafting"
formula: |2
  IT'S SHOWTIME
  
  I NEED YOUR CLOTHES YOUR BOOTS AND YOUR MOTORCYCLE TEMPLATE_POWER
  GET TO THE CHOPPER TEMPLATE_POWER
  HERE IS MY INVITATION 9000
  ENOUGH TALK
  
  LISTEN TO ME VERY CAREFULLY CLONE_ENTITY
  I NEED YOUR CLOTHES YOUR BOOTS AND YOUR MOTORCYCLE SOURCE_POWER
  GIVE THESE PEOPLE AIR
  I NEED YOUR CLOTHES YOUR BOOTS AND YOUR MOTORCYCLE NEW_POWER
  GET TO THE CHOPPER NEW_POWER
  HERE IS MY INVITATION SOURCE_POWER
  ENOUGH TALK
  TALK TO THE HAND "Entity cloned with power level:"
  TALK TO THE HAND NEW_POWER
  I'LL BE BACK NEW_POWER
  HASTA LA VISTA, BABY
  
  I NEED YOUR CLOTHES YOUR BOOTS AND YOUR MOTORCYCLE CLONED_BEAST
  GET YOUR ASS TO MARS CLONED_BEAST
  DO IT NOW CLONE_ENTITY TEMPLATE_POWER
  
  TALK TO THE HAND "Send the clone into battle."
  YOU HAVE BEEN TERMINATED
tags: ["creational", "prototype", "arnoldc", "cloning"]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: "Apprentice"
---

# The Prototype: Cloning the Beast

When creating a cyber-beast from scratch costs too much arcane energy, a true archmage of the wasteland simply clones an existing specimen. The Prototype pattern delegates the cloning process to the actual objects being cloned.

ArnoldC allows us to grab the exact state of our template and imprint it onto a new entity without asking questions. We don't care how it works under the hood; we just want a second killing machine immediately.
