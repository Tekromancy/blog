---
title: "The Flyweight: The Star Dust"
description: "Using sharing to support large numbers of fine-grained objects efficiently."
type: "crystal"
gofPattern: "Flyweight"
gofCategory: "Structural"
arcaneSchool: "Conjuration // Particle Swarms"
formula: |2
  class StarDustType
    property color : String
    property texture : String

    def initialize(@color : String, @texture : String)
    end

    def render(x : Int32, y : Int32)
      puts "Rendering a #{@color} stardust at (#{x}, #{y}) with #{@texture} texture."
    end
  end

  class StarDustFactory
    @@types = {} of String => StarDustType

    def self.get_type(color : String, texture : String) : StarDustType
      key = "#{color}_#{texture}"
      @@types[key] ||= StarDustType.new(color, texture)
    end

    def self.cache_size
      @@types.size
    end
  end

  class Particle
    @x : Int32
    @y : Int32
    @type : StarDustType

    def initialize(@x : Int32, @y : Int32, @type : StarDustType)
    end

    def draw
      @type.render(@x, @y)
    end
  end

  particles = [] of Particle

  10.times do |i|
    # Intrinsic state (color, texture) is shared
    type = StarDustFactory.get_type("Gold", "Sparkling")
    # Extrinsic state (x, y) is unique
    particles << Particle.new(i * 10, i * 5, type)
  end

  particles.each(&.draw)
  puts "Total unique stardust types in cache: #{StarDustFactory.cache_size}"
tags: ["structural", "flyweight", "crystal", "stardust"]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---
When a high-level spell demands a galaxy of particles, creating a full crystalline structure for each mote of dust exhausts the mana pool. The Flyweight extracts the intrinsic, shared essence into a cached StarDustType, rendering millions of unique positional sparks efficiently.
