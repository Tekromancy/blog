---
title: Singleton
description: Ensure a magical singularity or nexus core exists exactly once within the leyline network.
type: d
gofPattern: Singleton
gofCategory: Creational
arcaneSchool: "Evocation // Nexus Anchoring"
formula: |2
  class NexusCore {
      private this() {}
      private static __gshared NexusCore instance;

      static NexusCore getInstance() {
          if (instance is null) {
              synchronized(NexusCore.classinfo) {
                  if (instance is null) instance = new NexusCore();
              }
          }
          return instance;
      }
  }
tags: [creational, singleton, dlang, thread-safe]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
A unified anchor point in the arcane weave, accessible globally.
