---
title: The Singleton
description: Ensure a magical construct has only one instance, using the global unified namespace of the weave.
type: unison
gofPattern: Singleton
gofCategory: Creational
arcaneSchool: "Enchantment // Global Artifacts"
formula: |2
  -- The concept of a mutable Singleton is an anti-pattern in pure Unison.
  -- Instead, we define a pure global constant or use an Ability handler to inject a shared environment.
  
  structural type WorldTree = Node Text [WorldTree]
  
  theOneTree : WorldTree
  theOneTree = Node "Yggdrasil" []
  
  ability GlobalState v where
    get : () -> v
    
  withSingleton : v -> '{GlobalState v} a -> a
  withSingleton v f = 
    h : Request (GlobalState v) a -> a
    h = cases
      {GlobalState.get _ -> resume} -> handle resume v with h
      {a} -> a
    handle !f with h
tags: [creational, singleton, unison, abilities]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Singleton pattern is often an artifact of mutable, time-bound computing. In the pure, timeless realm of Unison, true singletons are simply immutable definitions embedded in the content-addressed namespace. When an ongoing, singular context is required throughout a spell's execution, an Ability such as `GlobalState` is summoned, allowing the single instance to be seamlessly woven into the tapestry of the executing code.
