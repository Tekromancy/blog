---
title: The Decorator of the Hypertext Labyrinth
description: Dynamically layer cybernetic augments upon the player's core identity.
type: twine
gofPattern: Decorator
gofCategory: Structural
arcaneSchool: "Transmutation // Enhancement"
formula: |2
  :: StoryInit
  <<set $player to {
    baseStealth: 10,
    getStealth: function() { return this.baseStealth; }
  }>>
  
  <<widget "applyOpticalCamo">>
    <<set _original to $player.getStealth>>
    <<set $player.getStealth to function() {
      return _original.call($player) + 15;
    }>>
  <</widget>>
  
  <<widget "applyShadowWeave">>
    <<set _original to $player.getStealth>>
    <<set $player.getStealth to function() {
      return _original.call($player) * 2;
    }>>
  <</widget>>
  
  :: Passage
  Base Stealth: <<print $player.getStealth()>>
  <<applyOpticalCamo>>
  Stealth after Camo: <<print $player.getStealth()>>
  <<applyShadowWeave>>
  Stealth after Shadow Weave: <<print $player.getStealth()>>
tags: [structural, decorator, augmentation]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---

In the sprawling meat-space and its digital reflections, a hacker is nothing without their augments. The **Decorator** pattern wraps an object with new behaviors dynamically at runtime, without fundamentally altering its base class structure.

By redefining the `$player.getStealth` method and chaining the original function call inside the new one, the Weaver layers enhancements—camo, shadow weaves, neural ghosts—like transparent glazes on a canvas. The augments stack infinitely, bending reality around the operative.
