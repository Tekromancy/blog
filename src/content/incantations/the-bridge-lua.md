---
title: "The Bridge of Spectral Planes"
description: "Separating the abstraction of a magical ritual from its specific elemental implementation."
type: lua
gofPattern: Bridge
gofCategory: Structural
arcaneSchool: Conjuration // Planar
formula: |
  local FireElement = { ignite = function() return "Flames burst" end }
  local FrostElement = { ignite = function() return "Frost shatters" end }

  local Ritual = {}
  Ritual.__index = Ritual

  function Ritual:new(element)
    return setmetatable({ element = element }, self)
  end
  function Ritual:perform()
    return "Performing ritual: " .. self.element.ignite()
  end

  local fireRitual = Ritual:new(FireElement)
  print(fireRitual:perform())
tags: [fae, bridge, decoupling]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

# Bridge

A ritual of power should not be tied inextricably to a single element. By employing the Bridge, we separate the structure of the spell (the Abstraction) from the elemental fury (the Implementation), linking them via Lua's dynamic table references.
