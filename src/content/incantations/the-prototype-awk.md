---
title: The Prototype in AWK
description: Clone associative arrays to duplicate intricate entity states without re-evaluation.
type: awk
gofPattern: Prototype
gofCategory: Creational
arcaneSchool: "Illusion // Biomancy"
formula: |2
  # The cloning ritual
  function clone_entity(src, dest,    k) {
      for (k in src) dest[k] = src[k]
  }
  
  BEGIN { 
      # The archetypal elemental
      proto_fire["element"] = "Fire"
      proto_fire["damage"] = 50
      proto_fire["duration"] = 5
      
      # Clone the prototype to create a specific minion
      clone_entity(proto_fire, minion1)
      
      # Mutate the clone's properties slightly
      minion1["damage"] = 75
      minion1["name"] = "Ember Fiend"
      
      print minion1["name"] " burns for " minion1["damage"] " damage!"
      print "Archetype damage remains: " proto_fire["damage"]
  }
tags: [awk, text-processing, creational]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

In the domain of AWK, native deep-copy mechanisms for arrays do not exist. The Prototype pattern is actualized through iteration, allowing the scribe to duplicate complex multi-dimensional states and spawn variations of standard text-processing configurations.
