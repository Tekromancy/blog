---
title: The Template Method of the Hypertext Labyrinth
description: Define the skeletal framework of a digital ritual, leaving the specifics to the subclasses.
type: twine
gofPattern: Template Method
gofCategory: Behavioral
arcaneSchool: "Conjuration // Ritual"
formula: |2
  :: StoryInit
  <<set setup.HackRitual = {
    // The Template Method
    executeRitual: function() {
      let log = this.initiateConnection() + "\n";
      log += this.deployPayload() + "\n";
      log += this.coverTracks();
      return log;
    },
    // Base implementations / hooks
    initiateConnection: function() { return "Connecting via proxy..."; },
    coverTracks: function() { return "Deleting logs..."; }
  }>>
  
  <<set setup.WormHack = Object.create(setup.HackRitual)>>
  <<set setup.WormHack.deployPayload = function() {
    return "Injecting self-replicating code!";
  }>>
  
  :: Passage
  Initiating Worm Sequence:
  <<print setup.WormHack.executeRitual()>>
tags: [behavioral, template-method, inheritance]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

Some digital rituals must follow a strict, immutable sequence—connect, inject, wipe. The **Template Method** pattern defines the overarching skeleton of the algorithm within the base `HackRitual` object.

The specific nuances of the `deployPayload` step are intentionally left undefined in the base layer. Specialized subclasses (like `WormHack`) override the payload step while inheriting the rigid sequence of `executeRitual()`. The structure of the labyrinth's magic remains pure, while the effects mutate wildly.
