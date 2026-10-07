---
title: Decorator
description: Dynamically augment cyber-constructs with new enchantments without altering their core matrix.
type: elixir
gofPattern: Decorator
gofCategory: Structural
arcaneSchool: "Transmutation // Enhancement"
formula: |2
  defmodule Tekromancy.Spellcaster do
    def cast(base_damage), do: base_damage
  end

  defmodule Tekromancy.Decorators do
    def add_fire_damage(fun) do
      fn damage -> fun.(damage) + 50 end
    end

    def add_void_echo(fun) do
      fn damage -> fun.(damage) * 2 end
    end
  end

  # Usage
  # spell = &Tekromancy.Spellcaster.cast/1
  # augmented_spell = spell 
  #                   |> Tekromancy.Decorators.add_fire_damage()
  #                   |> Tekromancy.Decorators.add_void_echo()
  # augmented_spell.(100) # => 300
tags: [elixir, structural, decorator, higher-order-functions]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

Why permanently mutate a spell when you can wrap it in layers of ephemeral power? By utilizing higher-order functions and closures, the Decorator pattern dynamically chains enchantments. The pipeline of functions enhances the raw telepathic force precisely at runtime, leaving the original incantation untouched.
