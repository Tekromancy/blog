---
title: "The Decorator: The Enchantment Wrapper"
description: "Attaching additional responsibilities to an object dynamically."
type: "crystal"
gofPattern: "Decorator"
gofCategory: "Structural"
arcaneSchool: "Transmutation // Enhancements"
formula: |2
  abstract class Relic
    abstract def inspect : String
    abstract def value : Int32
  end

  class Amulet < Relic
    def inspect : String
      "A simple brass amulet"
    end

    def value : Int32
      10
    end
  end

  abstract class RelicDecorator < Relic
    @relic : Relic

    def initialize(@relic : Relic)
    end
  end

  class GlowingEnchantment < RelicDecorator
    def inspect : String
      @relic.inspect + ", glowing with an eerie light"
    end

    def value : Int32
      @relic.value + 50
    end
  end

  class FloatingEnchantment < RelicDecorator
    def inspect : String
      @relic.inspect + ", floating slightly off the ground"
    end

    def value : Int32
      @relic.value + 100
    end
  end

  my_amulet = Amulet.new
  puts "#{my_amulet.inspect} | Value: #{my_amulet.value}"

  glowing_amulet = GlowingEnchantment.new(my_amulet)
  puts "#{glowing_amulet.inspect} | Value: #{glowing_amulet.value}"

  uber_amulet = FloatingEnchantment.new(glowing_amulet)
  puts "#{uber_amulet.inspect} | Value: #{uber_amulet.value}"
tags: ["structural", "decorator", "crystal", "enchantment"]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
Rather than forging infinite variations of magical items, the Decorator weaves volatile enchantments around a base Relic at runtime. Glowing, Floating, or Cursed modifiers wrap the object, stacking their magical effects elegantly.
