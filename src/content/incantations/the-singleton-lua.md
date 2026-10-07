---
title: "The Singleton of the World Tree"
description: "Ensures only one instance of a supreme magical artifact exists within the script environment."
type: lua
gofPattern: Singleton
gofCategory: Creational
arcaneSchool: Abjuration // Sealing
formula: |
  local WorldTree = {}
  local instance = nil

  function WorldTree:getInstance()
    if not instance then
      instance = { age = 0, magic = "Infinite" }
      setmetatable(instance, self)
      self.__index = self
    end
    return instance
  end

  local tree1 = WorldTree:getInstance()
  local tree2 = WorldTree:getInstance()
  assert(tree1 == tree2, "The World Tree is one and indivisible.")
tags: [fae, singleton, world-tree]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

# Singleton

Some forces in the symbiotic ecosystem must remain singular, a single point of truth amidst the sprawling tables of the universe. The Singleton pattern seals a magical artifact so deeply within its module closure that it can never be duplicated.
