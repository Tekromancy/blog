---
title: "The Strategy: The Battle Stance"
description: "Defining a family of algorithms, encapsulating each one, and making them interchangeable."
type: "crystal"
gofPattern: "Strategy"
gofCategory: "Behavioral"
arcaneSchool: "Evocation // Combat Tactics"
formula: |2
  abstract class CombatStrategy
    abstract def execute_attack(mana : Int32)
  end

  class AggressiveStance < CombatStrategy
    def execute_attack(mana : Int32)
      puts "Channeling all #{mana} mana into a devastating Fireblast!"
    end
  end

  class DefensiveStance < CombatStrategy
    def execute_attack(mana : Int32)
      puts "Using #{mana} mana to raise an impenetrable Ice Wall, while dealing minor frost damage."
    end
  end

  class BattleMage
    property strategy : CombatStrategy
    property mana : Int32

    def initialize(@strategy : CombatStrategy, @mana : Int32)
    end

    def engage
      @strategy.execute_attack(@mana)
    end
  end

  puts ">> Entering combat in Aggressive Stance..."
  mage = BattleMage.new(AggressiveStance.new, 100)
  mage.engage

  puts "\n>> The enemy strikes back! Switching to Defensive Stance..."
  mage.strategy = DefensiveStance.new
  mage.engage
tags: ["behavioral", "strategy", "crystal", "combat"]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
Depending on the tide of battle, a Mage must change their Battle Stance rapidly. The Strategy incantation encapsulates different combat algorithms into interchangeable stances, allowing the BattleMage to pivot from Aggressive to Defensive at runtime without rewriting their core combat logic.
