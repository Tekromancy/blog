---
title: "The Flyweight of Dust Motes"
description: "Sharing the magical essence across thousands of tiny, glowing motes to conserve mystical energy."
type: lua
gofPattern: Flyweight
gofCategory: Structural
arcaneSchool: Conjuration // Swarms
formula: |
  local MoteEssenceFactory = { essences = {} }
  function MoteEssenceFactory:getEssence(color)
    if not self.essences[color] then
      self.essences[color] = { color = color, glow = "Soft" }
    end
    return self.essences[color]
  end

  local Mote = {}
  Mote.__index = Mote
  function Mote:new(x, y, color)
    local obj = { x = x, y = y, essence = MoteEssenceFactory:getEssence(color) }
    return setmetatable(obj, self)
  end

  local swarm = {}
  for i=1, 1000 do
    table.insert(swarm, Mote:new(i, i, "Silver"))
  end
tags: [fae, flyweight, optimization]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

# Flyweight

When summoning a swarm of ten thousand fae dust motes, manifesting a unique magical essence for each would drain the host engine's memory. The Flyweight pattern shares the intrinsic Fae Moon Glyphs among them, altering only their extrinsic position in the universe.
