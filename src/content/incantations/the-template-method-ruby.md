---
title: The Template Method
description: "A rigid skeleton for standard dark rituals, allowing subclasses to customize only specific, permitted sacrifices."
type: ruby
gofPattern: Template Method
gofCategory: Behavioral
arcaneSchool: Evocation // Rituals
formula: |
  class BaseRitual
    def execute
      prepare_altar
      offer_sacrifice
      chant_incantation
      bind_power
    end

    def prepare_altar
      puts "Lighting black candles."
    end

    def offer_sacrifice
      raise NotImplementedError, "Must define the sacrifice!"
    end

    def chant_incantation
      raise NotImplementedError, "Must define the chant!"
    end

    def bind_power
      puts "The power is bound to the caster."
    end
  end

  class SummonImpRitual < BaseRitual
    def offer_sacrifice
      puts "Offering a rat's blood."
    end

    def chant_incantation
      puts "Chanting: Veni, minor daemon!"
    end
  end
tags: [ruby, design-pattern, template-method, blood-magic]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

The Template Method defines the skeleton of an algorithm in a base class but lets subclasses override specific steps. The `BaseRitual` guarantees the altar is prepared and the power is bound in the exact right order, leaving only the sacrifice and chant to the whims of the adept.
