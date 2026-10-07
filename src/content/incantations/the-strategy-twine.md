---
title: The Strategy of the Hypertext Labyrinth
description: Swap algorithms like memory shards to navigate the ever-shifting maze.
type: twine
gofPattern: Strategy
gofCategory: Behavioral
arcaneSchool: "Divination // Navigation"
formula: |2
  :: StoryInit
  <<set setup.BruteForceNav = function(path) {
    return "Smashing through ICE on path: " + path;
  }>>
  
  <<set setup.StealthNav = function(path) {
    return "Slipping silently past daemons on path: " + path;
  }>>
  
  <<set setup.CyberDeck = {
    navStrategy: setup.BruteForceNav,
    setStrategy: function(strat) { this.navStrategy = strat; },
    execute: function(path) { return this.navStrategy(path); }
  }>>
  
  :: Passage
  Deck output: <<print setup.CyberDeck.execute("Sector 7")>>
  
  <<link "Switch to Stealth Shard">>
    <<run setup.CyberDeck.setStrategy(setup.StealthNav)>>
    <<goto "Sector 7 Approach">>
  <</link>>
tags: [behavioral, strategy, algorithms]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

A veteran Runner carries multiple algorithmic shards, slotting them into the cyberdeck as the situation demands. The **Strategy** pattern allows a Weaver to encapsulate specific algorithms (strategies) and make them interchangeable at runtime.

The `CyberDeck` object doesn't know *how* to navigate the sector; it only knows to call `this.navStrategy()`. By swapping the strategy function from Brute Force to Stealth, the mechanical outcome of navigation changes dramatically without altering the underlying deck structure.
