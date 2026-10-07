---
title: "The Singleton: The World Stone"
description: "Ensuring a class has only one instance, and providing a global point of access to it."
type: "crystal"
gofPattern: "Singleton"
gofCategory: "Creational"
arcaneSchool: "Abjuration // Core Binding"
formula: |2
  class WorldStone
    # The magical core instance is cached upon first use
    @@instance : WorldStone?

    property mana_level : Int32

    private def initialize
      @mana_level = 9999
      puts "The World Stone awakens from its long slumber."
    end

    def self.instance : WorldStone
      @@instance ||= new
    end

    def siphon_mana(amount : Int32)
      @mana_level -= amount
      puts "Siphoned #{amount} mana. Remaining: #{@mana_level}"
    end
  end

  stone1 = WorldStone.instance
  stone1.siphon_mana(100)

  stone2 = WorldStone.instance
  stone2.siphon_mana(300)

  puts "Both mages are drawing from the same stone: #{stone1.same?(stone2)}"
tags: ["creational", "singleton", "crystal", "world-stone"]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
The Singleton is the ultimate anchor—a World Stone from which all mages in the realm draw their power. By restricting instantiation, we guarantee that all threads and fibers reference the exact same crystal, preventing chaotic splits in the world's underlying mana supply.
