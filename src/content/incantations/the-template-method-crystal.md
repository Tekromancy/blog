---
title: "The Template Method: The Alchemical Process"
description: "Defining the skeleton of an algorithm in an operation, deferring some steps to subclasses."
type: "crystal"
gofPattern: "Template Method"
gofCategory: "Behavioral"
arcaneSchool: "Transmutation // Alchemy"
formula: |2
  abstract class PotionRecipe
    # The Template Method
    def brew
      ignite_fire
      add_base_liquid
      add_ingredients
      stir
      bottle
    end

    def ignite_fire
      puts "Lighting the alchemical burner."
    end

    def add_base_liquid
      puts "Pouring distilled water into the cauldron."
    end

    # Deferred to subclasses
    abstract def add_ingredients

    def stir
      puts "Stirring the cauldron three times counter-clockwise."
    end

    def bottle
      puts "Pouring the finished potion into a glass vial."
    end
  end

  class HealthPotion < PotionRecipe
    def add_ingredients
      puts "Adding crushed red mountain flowers and a drop of troll blood."
    end
  end

  class ManaPotion < PotionRecipe
    def add_ingredients
      puts "Adding glowing blue mushrooms and powdered lapis lazuli."
    end
  end

  puts "=== Brewing a Health Potion ==="
  health_potion = HealthPotion.new
  health_potion.brew

  puts "\n=== Brewing a Mana Potion ==="
  mana_potion = ManaPotion.new
  mana_potion.brew
tags: ["behavioral", "template-method", "crystal", "alchemy"]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
Every Alchemical Process follows a rigid, fundamental sequence: light the fire, pour the base, add the ingredients, stir, and bottle. The Template Method cements this skeleton in the base PotionRecipe, leaving only the specific ingredients to be defined by the Health or Mana subclasses.
