---
title: Flyweight
description: Render sprawling starfields with minimal memory cost in Julia using the Flyweight pattern.
type: julia
gofPattern: Flyweight
gofCategory: Structural
arcaneSchool: Conjuration // Dimensional Compression
formula: |
  # Flyweight in Julia: Rendering the Night Sky
  
  # Intrinsic state (shared)
  struct StarType
      color::String
      temperature::Float64
  end
  
  # The Flyweight Factory
  const STAR_TYPES = Dict{String, StarType}()
  
  function get_star_type(color::String, temp::Float64)
      key = color * string(temp)
      if !haskey(STAR_TYPES, key)
          STAR_TYPES[key] = StarType(color, temp)
      end
      return STAR_TYPES[key]
  end
  
  # Extrinsic state (unique)
  struct PlacedStar
      x::Float64
      y::Float64
      z::Float64
      star_type::StarType
  end
  
  function draw_star(star::PlacedStar)
      println("Drawing star at (", star.x, ", ", star.y, ") with color ", star.star_type.color)
  end
  
  # Usage
  blue_giant = get_star_type("Blue", 25000.0)
  
  # Both stars share the same intrinsic StarType memory
  star1 = PlacedStar(1.0, 2.0, 3.0, blue_giant)
  star2 = PlacedStar(4.0, 5.0, 6.0, blue_giant) 
  
  draw_star(star1)
  draw_star(star2)
tags: [structural, flyweight, julia, astromancy]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
