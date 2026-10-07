---
title: The Flyweight
description: "Summoning an endless rain of blood-droplets, conserving mana by sharing the intrinsic essence of a single drop."
type: ruby
gofPattern: Flyweight
gofCategory: Structural
arcaneSchool: Conjuration // Optimization
formula: |
  class BloodDropEssence
    attr_reader :color, :toxicity

    def initialize(color, toxicity)
      @color = color
      @toxicity = toxicity
    end
    
    def splash(x, y)
      "Splash at #{x},#{y} with toxicity #{toxicity}."
    end
  end

  class EssenceFactory
    def initialize
      @essences = {}
    end

    def get_essence(color, toxicity)
      key = "#{color}_#{toxicity}"
      @essences[key] ||= BloodDropEssence.new(color, toxicity)
    end
  end

  class BloodRain
    def initialize(factory)
      @factory = factory
      @drops = []
    end

    def add_drop(x, y, color, toxicity)
      essence = @factory.get_essence(color, toxicity)
      @drops << { x: x, y: y, essence: essence }
    end
    
    def render_storm
      @drops.map { |drop| drop[:essence].splash(drop[:x], drop[:y]) }
    end
  end
tags: [ruby, design-pattern, flyweight, blood-magic]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Flyweight pattern minimizes memory usage by sharing as much data as possible with similar objects. In a Blood Rain spell, creating unique objects for a million drops would drain the caster's life force. Instead, the intrinsic state (color, toxicity) is shared, while the extrinsic state (coordinates) is passed in at execution.
