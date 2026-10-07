---
title: The Builder
description: Constructing complex magical artifacts via piping spells.
type: gleam
gofPattern: Builder
gofCategory: Creational
arcaneSchool: "Conjuration // Artifact Crafting"
formula: |2
  pub type Potion {
    Potion(name: String, mana: Int, healing: Int)
  }

  pub fn new_potion() -> Potion {
    Potion(name: "Nameless Brew", mana: 0, healing: 0)
  }

  pub fn with_name(potion: Potion, name: String) -> Potion {
    Potion(..potion, name: name)
  }

  pub fn add_mana(potion: Potion, amount: Int) -> Potion {
    Potion(..potion, mana: potion.mana + amount)
  }

  pub fn add_healing(potion: Potion, amount: Int) -> Potion {
    Potion(..potion, healing: potion.healing + amount)
  }

  // Usage:
  // new_potion()
  // |> with_name("Elixir of the BEAM")
  // |> add_mana(50)
  // |> add_healing(20)
tags: [conjuration, builder, gleam, pipeline]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
# The Builder
Why use a complex class when you can use the pipe operator (`|>`) to thread immutable state through pure transformative functions?
