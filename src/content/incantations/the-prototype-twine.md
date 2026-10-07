---
title: The Prototype of the Hypertext Labyrinth
description: Clone existing archetypal state objects to populate the endless digital corridors.
type: twine
gofPattern: Prototype
gofCategory: Creational
arcaneSchool: "Illusion // Duplication"
formula: |2
  :: StoryInit
  <<set $prototypes to {
    basicDrone: { name: "Sector Drone", shield: 10, patrol: true },
    eliteHunter: { name: "Hunter-Killer", shield: 50, track: true }
  }>>
  
  :: Encounter
  <<set $currentEnemy to clone($prototypes.eliteHunter)>>
  <<set $currentEnemy.name to "Defective Hunter-Killer">>
  <<set $currentEnemy.shield to 20>>
  
  You are facing a <<print $currentEnemy.name>> with <<print $currentEnemy.shield>> shield!
tags: [creational, prototype, cloning]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

When the cost of crafting complex data objects from the void is too high, the **Prototype** pattern allows a Weaver to merely copy existing archetypes.

In Sugarcube, the holy `clone()` function is the lifeblood of this pattern. It deeply duplicates an archetype defined in your grimoire (`StoryInit`), allowing you to mutate the copy—lowering shields, corrupting names—without altering the pristine platonic ideal stored in the `$prototypes` registry.
