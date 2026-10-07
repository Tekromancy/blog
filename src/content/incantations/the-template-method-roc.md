---
title: The Template Method of Potions
description: Defining the skeleton of an alchemical brewing process with customizable steps.
type: roc
gofPattern: Template Method
gofCategory: Behavioral
arcaneSchool: "Transmutation // Alchemy"
tags: [fast-functional-wards, roc, template-method]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
formula: |2
  interface PotionTemplate
      exposes [Recipe, brewPotion]
      imports []

  Recipe : {
      gatherIngredients : {} -> Str,
      brew : Str -> Str,
      bottle : Str -> Str
  }

  brewPotion : Recipe -> Str
  brewPotion = \recipe ->
      ingreds = recipe.gatherIngredients {}
      brewed = recipe.brew ingreds
      recipe.bottle brewed

  # Example implementation
  healingRecipe : Recipe
  healingRecipe = {
      gatherIngredients: \_ -> "Red herbs",
      brew: \herbs -> "Boiled ${herbs} in pure water",
      bottle: \liquid -> "Bottled ${liquid} in a glass vial."
  }
---
