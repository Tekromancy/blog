---
title: "The Prototype of Echoing Shadows"
description: "Cloning existing magical entities by copying their essence across tables."
type: lua
gofPattern: Prototype
gofCategory: Creational
arcaneSchool: Illusion // Cloning
formula: |
  local Prototype = {}
  function Prototype:clone(obj)
    local cloned = {}
    for k, v in pairs(obj) do
      cloned[k] = v
    end
    setmetatable(cloned, getmetatable(obj))
    return cloned
  end

  local ShadowFamiliar = { type = "Shadow", strength = 10 }
  local ShadowClone = Prototype:clone(ShadowFamiliar)
  ShadowClone.strength = 15
tags: [fae, prototype, cloning]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

# Prototype

To clone a spell is to trace its Fae Moon Glyphs perfectly onto a new table. In Lua, the universe is built of such tables. The Prototype pattern duplicates the essence of an existing entity without invoking the heavy rituals of its original creation.
