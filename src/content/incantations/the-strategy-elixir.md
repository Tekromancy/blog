---
title: Strategy
description: Swap out algorithms and combat protocols dynamically during the heat of a cyber-duel.
type: elixir
gofPattern: Strategy
gofCategory: Behavioral
arcaneSchool: "Evocation // Tactical-Weaving"
formula: |2
  defmodule Tekromancy.CombatAI do
    def evaluate(target, strategy_fn) do
      strategy_fn.(target)
    end
  end

  defmodule Tekromancy.Strategies do
    def aggressive(target), do: "Strike #{target} with all available plasma!"
    def defensive(target), do: "Raise shields and evade #{target}'s lock."
    def stealth(target), do: "Cloak and bypass #{target}'s sensors."
  end

  # Usage:
  # Tekromancy.CombatAI.evaluate("ICE_Node", &Tekromancy.Strategies.stealth/1)
tags: [elixir, behavioral, strategy, functions, ai]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

Why encode hard dependencies when functions are first-class citizens? The Strategy pattern shines by passing function references. A drone can adapt its combat AI instantly by switching from `&Strategies.aggressive/1` to `&Strategies.stealth/1`, seamlessly outmaneuvering corporate ICE programs.
