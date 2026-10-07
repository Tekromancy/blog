---
title: "The Composite of the Fairy Ring"
description: "Treating individual fae spirits and massive circles of spirits through the exact same interface."
type: lua
gofPattern: Composite
gofCategory: Structural
arcaneSchool: "Enchantment // Chanting"
formula: |2
  local FaeEntity = {}
  function FaeEntity:sing() end

  local Sprite = setmetatable({}, {__index = FaeEntity})
  function Sprite:new(name) return setmetatable({name=name}, {__index=self}) end
  function Sprite:sing() print(self.name .. " chimes.") end

  local FairyRing = setmetatable({}, {__index = FaeEntity})
  function FairyRing:new() return setmetatable({members={}}, {__index=self}) end
  function FairyRing:add(fae) table.insert(self.members, fae) end
  function FairyRing:sing()
    for _, fae in ipairs(self.members) do fae:sing() end
  end

  local ring = FairyRing:new()
  ring:add(Sprite:new("Puck"))
  ring:add(Sprite:new("Ariel"))
  ring:sing()
tags: [fae, composite, trees]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

# Composite

A single sprite holds power, but a Fairy Ring composed of a hundred sprites holds a chorus. The Composite pattern unifies the invocation. To the host engine, commanding a solitary wisp or an entire magical hierarchy is executed through a single `sing()` method.
