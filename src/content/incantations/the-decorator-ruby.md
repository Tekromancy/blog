---
title: The Decorator
description: "Dynamically weaving successive curses and blood hexes onto a base spell, amplifying its ruinous power."
type: ruby
gofPattern: Decorator
gofCategory: Structural
arcaneSchool: "Enchantment // Hexing"
formula: |2
  class Spell
    def cast
      "A bolt of arcane energy"
    end

    def cost
      10
    end
  end

  class SpellDecorator < Spell
    def initialize(spell)
      @spell = spell
    end

    def cast
      @spell.cast
    end

    def cost
      @spell.cost
    end
  end

  class BloodHexDecorator < SpellDecorator
    def cast
      super + ", dripping with boiling vitae"
    end

    def cost
      super + 15
    end
  end

  class SoulTearDecorator < SpellDecorator
    def cast
      super + ", ripping the target's spirit"
    end

    def cost
      super + 25
    end
  end

  # Usage:
  # base_spell = Spell.new
  # bloody_spell = BloodHexDecorator.new(base_spell)
  # ultimate_doom = SoulTearDecorator.new(bloody_spell)
tags: [ruby, design-pattern, decorator, blood-magic]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Decorator attaches additional responsibilities—or devastating curses—to an object dynamically. It provides a flexible alternative to subclassing for extending functionality, allowing a warlock to stack endless layers of agony upon a single incantation.
