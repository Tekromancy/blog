---
title: The Flyweight of the Hypertext Labyrinth
description: Conserve system memory by sharing the intrinsic state of a million synthetic swarms.
type: twine
gofPattern: Flyweight
gofCategory: Structural
arcaneSchool: "Enchantment // Compression"
formula: |2
  :: StoryInit
  /* Intrinsic state (shared, immutable) */
  <<set setup.DroneType = {
    texture: "chrome.png",
    model: "X-900",
    maxSpeed: 200
  }>>
  
  /* Extrinsic state (unique per instance) */
  <<set $swarm to []>>
  <<for _i to 0; _i < 1000; _i++>>
    <<run $swarm.push({
      x: random(0, 100),
      y: random(0, 100),
      hp: 10,
      typeRef: setup.DroneType
    })>>
  <</for>>
  
  :: Passage
  You are surrounded by <<print $swarm.length>> drones.
  The nearest one is a <<print $swarm[0].typeRef.model>> at coordinates (<<print $swarm[0].x>>, <<print $swarm[0].y>>).
tags: [structural, flyweight, optimization]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

When the AI overlord spawns a swarm of a million seeker drones, storing the heavy `texture` and `model` data inside every single drone object will crash the reality engine (and the browser's memory). 

The **Flyweight** pattern prevents memory death. It isolates the intrinsic, unchanging properties of the drone into a single, globally shared object (`setup.DroneType`). The individual entities in the `$swarm` only store their unique extrinsic state—coordinates and health—and hold a lightweight reference to the shared soul of their archetype.
