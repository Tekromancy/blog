---
title: "The Abstract Factory of Fae Moon Glyphs"
description: "A creational pattern that summons families of related magical objects through sympathetic table weaving."
type: lua
gofPattern: Abstract Factory
gofCategory: Creational
arcaneSchool: "Conjuration // Symbiosis"
formula: |2
  local FaeFactory = {}
  function FaeFactory:new(moonPhase)
    local obj = { phase = moonPhase }
    setmetatable(obj, self)
    self.__index = self
    return obj
  end
  function FaeFactory:createWisp() end
  function FaeFactory:createGlamour() end

  local WaxingFactory = FaeFactory:new("Waxing")
  function WaxingFactory:createWisp() return "Bright Wisp" end
  function WaxingFactory:createGlamour() return "Silver Glamour" end

  local WaningFactory = FaeFactory:new("Waning")
  function WaningFactory:createWisp() return "Dim Wisp" end
  function WaningFactory:createGlamour() return "Shadow Glamour" end
tags: [fae, abstract-factory, creation]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

# Abstract Factory

In the symbiotic scripting of the World Engine, the Fae Moon Glyphs govern the creation of interwoven magical constructs. The Abstract Factory acts as a constellation of metatables, determining whether your wisps and glamours are born of the Waxing or Waning moon.
