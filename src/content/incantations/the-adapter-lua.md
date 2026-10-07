---
title: "The Adapter of Foreign Tongues"
description: "Bridging the host engine's magic with the delicate syntax of Lua's Fae Glyphs."
type: lua
gofPattern: Adapter
gofCategory: Structural
arcaneSchool: "Transmutation // Bridging"
formula: |2
  local HostEngineAPI = {
    execute_spell_command = function(self, cmd) return "Executing: " .. cmd end
  }

  local FaeWand = {
    wave = function(self, spellName)
      return self.engine:execute_spell_command("CAST " .. spellName)
    end
  }

  function createFaeWandAdapter(engine)
    local wand = { engine = engine }
    setmetatable(wand, { __index = FaeWand })
    return wand
  end

  local wand = createFaeWandAdapter(HostEngineAPI)
  print(wand:wave("Luminescence"))
tags: [fae, adapter, host-binding]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

# Adapter

When an ancient C++ Host Engine speaks in rigid system calls, the symbiotic Lua scripts must adapt. The Adapter pattern translates the brute force of the underlying universe into the elegant, sweeping arcs of the Fae Moon Glyphs.
