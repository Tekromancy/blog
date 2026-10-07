---
title: "The Factory Method of Sylvan Spawning"
description: "Delegates the manifestation of fae spirits to specific lunar sub-tables."
type: lua
gofPattern: Factory Method
gofCategory: Creational
arcaneSchool: Conjuration // Spawning
formula: |
  local SpiritSpawner = {}
  SpiritSpawner.__index = SpiritSpawner

  function SpiritSpawner:new()
    return setmetatable({}, self)
  end
  function SpiritSpawner:manifest()
    error("Subclasses must override manifest")
  end
  function SpiritSpawner:summon()
    local spirit = self:manifest()
    print("Summoning " .. spirit)
    return spirit
  end

  local SylphSpawner = setmetatable({}, {__index = SpiritSpawner})
  function SylphSpawner:manifest() return "Sylph of the West Wind" end
tags: [fae, factory-method, creation]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

# Factory Method

A delicate technique in symbiotic magic, the Factory Method leaves the exact nature of the summoned spirit to the specific localized glyphs. The host engine calls upon a generalized invocation, while the specialized Lua table dictates the exact form of the entity.
