---
title: "The Composite: The Fractal Coven"
description: "Composing objects into tree structures to represent part-whole hierarchies."
type: "crystal"
gofPattern: "Composite"
gofCategory: "Structural"
arcaneSchool: "Illusion // Fractal Magic"
formula: |2
  abstract class SpellComponent
    abstract def power_level : Int32
  end

  # Leaf
  class Sigil < SpellComponent
    @power : Int32

    def initialize(@power : Int32)
    end

    def power_level : Int32
      @power
    end
  end

  # Composite
  class SpellCluster < SpellComponent
    @components = [] of SpellComponent

    def add(component : SpellComponent)
      @components << component
    end

    def power_level : Int32
      total = 0
      @components.each do |comp|
        total += comp.power_level
      end
      total
    end
  end

  fire_sigil = Sigil.new(10)
  frost_sigil = Sigil.new(15)

  minor_cluster = SpellCluster.new
  minor_cluster.add(fire_sigil)
  minor_cluster.add(frost_sigil)

  void_sigil = Sigil.new(50)

  master_cluster = SpellCluster.new
  master_cluster.add(minor_cluster)
  master_cluster.add(void_sigil)

  puts "Total Coven Power: #{master_cluster.power_level}"
tags: ["structural", "composite", "crystal", "coven"]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
Within a Fractal Coven, individual sigils and massive spell clusters are treated uniformly. The Composite incantation allows a master mage to invoke the power level of a single leaf node or an entire tree of spells with a single command.
