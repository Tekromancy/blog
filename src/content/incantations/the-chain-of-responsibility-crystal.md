---
title: "The Chain of Responsibility: The Ascending Wards"
description: "Avoiding coupling the sender of a request to its receiver by giving more than one object a chance to handle the request."
type: "crystal"
gofPattern: "Chain of Responsibility"
gofCategory: "Behavioral"
arcaneSchool: "Abjuration // Ward Weaving"
formula: |2
  abstract class MagicalWard
    property next_ward : MagicalWard?

    def set_next(ward : MagicalWard) : MagicalWard
      @next_ward = ward
      ward
    end

    abstract def handle_spell(spell_power : Int32)
  end

  class CrystalWard < MagicalWard
    def handle_spell(spell_power : Int32)
      if spell_power <= 10
        puts "Crystal Ward absorbed the minor spell (power: #{spell_power})."
      elsif n = @next_ward
        puts "Crystal Ward cracked! Passing spell upstream."
        n.handle_spell(spell_power)
      end
    end
  end

  class DiamondWard < MagicalWard
    def handle_spell(spell_power : Int32)
      if spell_power <= 50
        puts "Diamond Ward nullified the moderate spell (power: #{spell_power})."
      elsif n = @next_ward
        puts "Diamond Ward shattered! Passing spell upstream."
        n.handle_spell(spell_power)
      end
    end
  end

  class VoidWard < MagicalWard
    def handle_spell(spell_power : Int32)
      puts "Void Ward consumes the massive spell (power: #{spell_power}), leaving nothing behind."
    end
  end

  base_ward = CrystalWard.new
  diamond = DiamondWard.new
  void = VoidWard.new

  base_ward.set_next(diamond).set_next(void)

  puts ">> Incoming spell: 5"
  base_ward.handle_spell(5)

  puts "\n>> Incoming spell: 40"
  base_ward.handle_spell(40)

  puts "\n>> Incoming spell: 9000"
  base_ward.handle_spell(9000)
tags: ["behavioral", "chain-of-responsibility", "crystal", "wards"]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
When a massive barrage of hostile magic strikes, a single shield is rarely enough. The Ascending Wards form a Chain of Responsibility. A minor hex is caught by the fragile Crystal, but overwhelming energy shatters its way up the chain until it is consumed by the Void.
