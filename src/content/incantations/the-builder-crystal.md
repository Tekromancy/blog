---
title: "The Builder: Faceting the Monolith"
description: "Separating the construction of a complex crystal structure from its final representation."
type: "crystal"
gofPattern: "Builder"
gofCategory: "Creational"
arcaneSchool: "Conjuration // Crystalline Form"
formula: |2
  class Monolith
    property core : String = ""
    property facets : Int32 = 0
    property aura : String = ""

    def manifest
      "A Monolith with a #{core} core, #{facets} facets, radiating a #{aura} aura."
    end
  end

  abstract class MonolithBuilder
    abstract def build_core
    abstract def carve_facets
    abstract def enchant_aura
    abstract def monolith : Monolith
  end

  class ObsidianBuilder < MonolithBuilder
    @monolith = Monolith.new

    def build_core
      @monolith.core = "Void"
    end

    def carve_facets
      @monolith.facets = 8
    end

    def enchant_aura
      @monolith.aura = "Shadow"
    end

    def monolith : Monolith
      @monolith
    end
  end

  class QuartzBuilder < MonolithBuilder
    @monolith = Monolith.new

    def build_core
      @monolith.core = "Light"
    end

    def carve_facets
      @monolith.facets = 32
    end

    def enchant_aura
      @monolith.aura = "Prismatic"
    end

    def monolith : Monolith
      @monolith
    end
  end

  class ArchmageDirector
    property builder : MonolithBuilder?

    def construct_monolith
      if b = @builder
        b.build_core
        b.carve_facets
        b.enchant_aura
      end
    end
  end

  director = ArchmageDirector.new
  builder = ObsidianBuilder.new
  director.builder = builder
  director.construct_monolith
  puts builder.monolith.manifest
tags: ["creational", "builder", "crystal", "monolith"]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
The Builder incantation allows an Archmage to separate the intricate steps of carving and enchanting a monolith from its final state. By passing a specific builder (like Quartz or Obsidian) to the director, the same construction ritual yields profoundly different magical constructs.
