---
title: The Strategy
description: "Selecting the optimal method of ritual execution at runtime, swapping between slow bleeding and explosive exsanguination."
type: ruby
gofPattern: Strategy
gofCategory: Behavioral
arcaneSchool: Divination // Tactics
formula: |
  class ExsanguinationStrategy
    def execute_ritual(victim)
      "Explosively violently draining all blood from #{victim}."
    end
  end

  class SlowBleedStrategy
    def execute_ritual(victim)
      "Methodically draining vitae drop by drop from #{victim}."
    end
  end

  class RitualCaster
    attr_writer :strategy

    def initialize(strategy)
      @strategy = strategy
    end

    def perform(victim)
      @strategy.execute_ritual(victim)
    end
  end

  # Usage:
  # caster = RitualCaster.new(SlowBleedStrategy.new)
  # caster.perform("The Paladin")
  # caster.strategy = ExsanguinationStrategy.new
  # caster.perform("The Cleric")
tags: [ruby, design-pattern, strategy, blood-magic]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Strategy pattern defines a family of algorithms, encapsulates them, and makes them interchangeable. A hemomancer can alter their methodology mid-ritual without changing the core casting mechanics.
