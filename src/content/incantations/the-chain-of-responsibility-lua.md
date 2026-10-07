---
title: "The Chain of Responsibility of the Seelie Court"
description: "Passing a magical petition up through the hierarchy of fae nobility."
type: lua
gofPattern: Chain of Responsibility
gofCategory: Behavioral
arcaneSchool: "Enchantment // Court"
formula: |2
  local Courtier = {}
  Courtier.__index = Courtier

  function Courtier:new(name, threshold, nextNoble)
    return setmetatable({name=name, limit=threshold, next=nextNoble}, self)
  end

  function Courtier:handlePetition(power)
    if power <= self.limit then
      print(self.name .. " handles the petition of power " .. power)
    elseif self.next then
      self.next:handlePetition(power)
    else
      print("The petition goes unanswered.")
    end
  end

  local queen = Courtier:new("Titania", 1000, nil)
  local knight = Courtier:new("Puck", 100, queen)
  local sprite = Courtier:new("Dewdrop", 10, knight)

  sprite:handlePetition(5)
  sprite:handlePetition(50)
  sprite:handlePetition(500)
tags: [fae, chain-of-responsibility, hierarchy]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

# Chain of Responsibility

In the Seelie Court, a mere sprite cannot grant a grand boon. The Chain of Responsibility pattern allows an invocation to be passed sequentially up the hierarchy of the universe's tables until a noble with sufficient power is found to process the magical request.
