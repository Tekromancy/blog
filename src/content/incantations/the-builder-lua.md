---
title: "The Builder of Moonlit Constructs"
description: "A creational pattern to weave complex magical entities step-by-step from the lunar fabric."
type: lua
gofPattern: Builder
gofCategory: Creational
arcaneSchool: "Transmutation // Weaving"
formula: |2
  local GolemBuilder = {}
  GolemBuilder.__index = GolemBuilder

  function GolemBuilder:new()
    return setmetatable({ golem = {} }, self)
  end
  function GolemBuilder:bindCore(coreType)
    self.golem.core = coreType
    return self
  end
  function GolemBuilder:etchRunes(runes)
    self.golem.runes = runes
    return self
  end
  function GolemBuilder:awaken()
    return self.golem
  end

  local myGolem = GolemBuilder:new()
    :bindCore("Starlight")
    :etchRunes("Fae Moon Glyphs")
    :awaken()
tags: [fae, builder, creation]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

# Builder

Rather than speaking the entirety of a spell in one breathless utterance, the Builder pattern allows a spellcaster to carefully stitch together the fabric of a magical construct. Using method chaining, the host engine can incrementally construct the universe's tables.
