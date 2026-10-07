---
title: The State of the Hypertext Labyrinth
description: Morph the behaviors of a digital entity dynamically as it transitions between phases.
type: twine
gofPattern: State
gofCategory: Behavioral
arcaneSchool: "Transmutation // Polymorphism"
formula: |2
  :: StoryInit
  <<set setup.StateIdle = {
    react: function() { return "The Turret hums quietly."; }
  }>>
  
  <<set setup.StateHostile = {
    react: function() { return "The Turret tracks your movement and fires!"; }
  }>>
  
  <<set setup.Turret = {
    currentState: setup.StateIdle,
    setState: function(state) { this.currentState = state; },
    scan: function() { return this.currentState.react(); }
  }>>
  
  :: Passage
  Current Status: <<print setup.Turret.scan()>>
  
  <<link "Trip the Laser Wire">>
    <<run setup.Turret.setState(setup.StateHostile)>>
    <<goto "Combat">>
  <</link>>
tags: [behavioral, state, finite-state-machine]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

A defense program in the Labyrinth does not merely change a boolean variable when agitated; its entire operational paradigm shifts. The **State** pattern encapsulates behavior into discrete state objects.

Instead of writing massive `if-else` blocks inside the Turret's `scan()` method, the Turret delegates the action to its `currentState` object. When the laser wire is tripped, the Weaver swaps the Turret's soul from `StateIdle` to `StateHostile`. The entity's response mutates instantly.
