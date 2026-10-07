---
title: "The Mediator of the World Council"
description: "Centralizing the communication between chaotic elemental forces."
type: lua
gofPattern: Mediator
gofCategory: Behavioral
arcaneSchool: Abjuration // Balancing
formula: |
  local Council = {}
  function Council:notify(sender, event)
    if event == "Tempest" then
      print("Council suppresses the storm caused by " .. sender.name)
    end
  end

  local Elemental = {}
  Elemental.__index = Elemental
  function Elemental:new(name, mediator)
    return setmetatable({name=name, mediator=mediator}, self)
  end
  function Elemental:rage()
    self.mediator:notify(self, "Tempest")
  end

  local fire = Elemental:new("Ignis", Council)
  fire:rage()
tags: [fae, mediator, centralization]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

# Mediator

Elementals are chaotic; if left alone, their interlocking reactions would unravel the host engine. The Mediator pattern institutes a World Council. Instead of elementals directly invoking one another, all Fae Moon Glyphs are routed through the central table, ensuring perfect cosmic balance.
