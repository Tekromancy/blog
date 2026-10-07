---
title: "The Abstract Factory: Resonating Geodes"
description: "Conjuring families of related crystalline structures without specifying their concrete gem classes."
type: "crystal"
gofPattern: "Abstract Factory"
gofCategory: "Creational"
arcaneSchool: "Conjuration // Gemcrafting"
formula: |2
  abstract class AbstractGeodeFactory
    abstract def create_crystal : Crystal
    abstract def create_rune : Rune
  end

  abstract class Crystal
    abstract def resonate
  end

  abstract class Rune
    abstract def glow
  end

  class RubyFactory < AbstractGeodeFactory
    def create_crystal : Crystal
      RubyCrystal.new
    end
    def create_rune : Rune
      RubyRune.new
    end
  end

  class SapphireFactory < AbstractGeodeFactory
    def create_crystal : Crystal
      SapphireCrystal.new
    end
    def create_rune : Rune
      SapphireRune.new
    end
  end

  class RubyCrystal < Crystal
    def resonate
      puts "The Ruby crystal vibrates with crimson heat."
    end
  end

  class RubyRune < Rune
    def glow
      puts "The Ruby rune flares with inner fire."
    end
  end

  class SapphireCrystal < Crystal
    def resonate
      puts "The Sapphire crystal hums with a chilling breeze."
    end
  end

  class SapphireRune < Rune
    def glow
      puts "The Sapphire rune emanates a frosty blue light."
    end
  end

  def invoke_geode(factory : AbstractGeodeFactory)
    crystal = factory.create_crystal
    rune = factory.create_rune
    crystal.resonate
    rune.glow
  end

  puts ">> Channeling Ruby Geode..."
  invoke_geode(RubyFactory.new)
  puts ">> Channeling Sapphire Geode..."
  invoke_geode(SapphireFactory.new)
tags: ["creational", "abstract-factory", "crystal", "gemcrafting"]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
In the deep caverns of compiling, an Abstract Factory provides an interface for crafting families of related or dependent crystalline artifacts without naming their exact classes. Through the magic of type-safe gemology, we channel either the burning heat of Ruby or the chilling intellect of Sapphire.
