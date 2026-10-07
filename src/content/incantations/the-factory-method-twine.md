---
title: The Factory Method of the Hypertext Labyrinth
description: Defer the instantiation of labyrinth entities to specialized subclass widgets.
type: twine
gofPattern: Factory Method
gofCategory: Creational
arcaneSchool: "Conjuration // Spawning"
formula: |2
  :: Widget: EntityFactory [widget]
  <<widget "spawnEntity">>
    <<set _type to _args[0]>>
    <<if _type is "ICE">>
      <<return { name: "Black ICE", health: 100, attack: 50, protocol: "lethal" }>>
    <<elseif _type is "Daemon">>
      <<return { name: "Watcher Daemon", health: 20, stealth: 80, protocol: "alert" }>>
    <<else>>
      <<return { name: "Glitch", health: 1, protocol: "erratic" }>>
    <</if>>
  <</widget>>
  
  :: Encounter
  <<set $enemy to spawnEntity(either("ICE", "Daemon"))>>
  A wild <<print $enemy.name>> appears in the datastream!
tags: [creational, factory-method, entities]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

Rather than writing arcane instantiation logic inside every story passage, a Weaver delegates entity creation to a central **Factory Method**.

The `spawnEntity` macro becomes the singular origin point for the creatures that stalk the Hypertext Labyrinth. Should a new breed of cyber-demon emerge, you need only update the core factory widget, leaving the sprawling labyrinth passages untouched.
