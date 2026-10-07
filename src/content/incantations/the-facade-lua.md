---
title: "The Facade of the Archdruid"
description: "Providing a simple, unified rune to trigger a massive cascade of complex underlying sub-systems."
type: lua
gofPattern: Facade
gofCategory: Structural
arcaneSchool: Evocation // Invocation
formula: |
  local Leyline = { draw = function() print("Drawing leyline power...") end }
  local Elementals = { summon = function() print("Summoning elements...") end }
  local MoonPhase = { align = function() print("Aligning with the moon...") end }

  local ArchdruidFacade = {}
  function ArchdruidFacade:castEclipseRitual()
    Leyline.draw()
    MoonPhase.align()
    Elementals.summon()
    print("The Eclipse Ritual is complete!")
  end

  ArchdruidFacade:castEclipseRitual()
tags: [fae, facade, macro]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

# Facade

The universe's tables are vast and chaotic, intertwining leylines, elementals, and lunar phases. To spare the symbiotic scripts from managing such overwhelming complexity, the Facade pattern acts as an Archdruid, exposing a single, simple incantation to command the storm.
