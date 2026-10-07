---
title: The Singleton of the Hypertext Labyrinth
description: Ensure that the core routing matrix of the labyrinth has only one stateful existence.
type: twine
gofPattern: Singleton
gofCategory: Creational
arcaneSchool: "Abjuration // Isolation"
formula: |2
  :: StoryInit
  /* The Singleton is enforced by initializing it once globally */
  <<set setup.NexusCore to {
    activeConnections: 0,
    securityLevel: 1,
    connect: function() {
      this.activeConnections++;
      if (this.activeConnections > 5) {
        this.securityLevel++;
      }
    }
  }>>
  
  :: Passage
  <<run setup.NexusCore.connect()>>
  The Nexus security level is currently: <<print setup.NexusCore.securityLevel>>.
tags: [creational, singleton, global-state]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

In a Twine grimoire, the story state (`$`) is cloned between passages, allowing time-travel via the undo button. But sometimes, a Weaver needs an object that transcends the timeline—a **Singleton**.

By attaching the object to the immutable `setup` object in Sugarcube, the `NexusCore` persists exactly once across the entire memory space. It defies the temporal rollback of the labyrinth, maintaining true global state. Beware: what happens to the Singleton cannot be undone.
