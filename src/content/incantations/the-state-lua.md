---
title: "The State of the Shapeshifter"
description: "Altering an entity's behavior entirely by swapping its internal magical state table."
type: lua
gofPattern: State
gofCategory: Behavioral
arcaneSchool: "Transmutation // Polymorph"
formula: |2
  local BearState = { attack = function() return "Maul!" end }
  local EagleState = { attack = function() return "Dive!" end }

  local Druid = { state = BearState }
  function Druid:shift(newState)
    self.state = newState
  end
  function Druid:strike()
    return self.state.attack()
  end

  print(Druid:strike())
  Druid:shift(EagleState)
  print(Druid:strike())
tags: [fae, state, polymorphism]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

# State

A shapeshifter’s essence fundamentally alters depending on their current form. In Lua, the State pattern is trivially elegant: simply replace the internal state reference with a different table of Fae Moon Glyphs. The druid’s `strike()` command dynamically delegates to the active spirit form.
