---
title: "The Observer of the Night Sky"
description: "A subscription to the cosmos where starry events trigger earthly magic."
type: lua
gofPattern: Observer
gofCategory: Behavioral
arcaneSchool: "Divination // Astrology"
formula: |2
  local Moon = { observers = {} }
  function Moon:subscribe(obs)
    table.insert(self.observers, obs)
  end
  function Moon:eclipse()
    for _, obs in ipairs(self.observers) do
      obs:onEclipse()
    end
  end

  local Wolf = {
    onEclipse = function() print("The Wolf howls at the eclipsed moon!") end
  }
  local Tide = {
    onEclipse = function() print("The Tides rise unusually high.") end
  }

  Moon:subscribe(Wolf)
  Moon:subscribe(Tide)
  Moon:eclipse()
tags: [fae, observer, events]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

# Observer

Through the Fae Moon Glyphs, the cosmos whispers to the earth. The Observer pattern allows symbiotic scripts to attach themselves to central events. When the Moon table triggers an eclipse, all observing entities react instantaneously across the universe's fabric.
