---
title: "The Template Method of the Alchemist"
description: "Defining the skeletal structure of a potion recipe while letting subclasses fill in the specific ingredients."
type: lua
gofPattern: Template Method
gofCategory: Behavioral
arcaneSchool: "Transmutation // Alchemy"
formula: |2
  local PotionRecipe = {}
  PotionRecipe.__index = PotionRecipe

  function PotionRecipe:new() return setmetatable({}, self) end
  function PotionRecipe:boilWater() print("Boiling water...") end
  function PotionRecipe:addIngredients() error("Must provide ingredients") end
  function PotionRecipe:brew()
    self:boilWater()
    self:addIngredients()
    print("Potion is ready!")
  end

  local HealingPotion = PotionRecipe:new()
  function HealingPotion:addIngredients() print("Adding Troll Blood and Elfroot.") end

  HealingPotion:brew()
tags: [fae, template-method, inheritance]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

# Template Method

Every alchemical brewing follows the same rhythmic ritual, yet the ingredients vary wildly. The Template Method lays out the unyielding structure of the Fae Moon Glyphs, allowing symbiotic child tables to supply only the specific magical components needed for their unique brew.
