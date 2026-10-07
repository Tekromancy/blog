---
title: Builder
description: Construct complex magical and mathematical entities in Julia using the Builder pattern.
type: julia
gofPattern: Builder
gofCategory: Creational
arcaneSchool: "Transmutation // Celestial Forging"
formula: |2
  # Builder in Julia: Constructing an Astrolabe
  mutable struct Astrolabe
      ring_count::Int
      material::String
      runes::Vector{String}
      Astrolabe() = new(0, "Brass", String[])
  end

  mutable struct AstrolabeBuilder
      astrolabe::Astrolabe
      AstrolabeBuilder() = new(Astrolabe())
  end

  function add_rings!(builder::AstrolabeBuilder, count::Int)
      builder.astrolabe.ring_count += count
      return builder
  end

  function set_material!(builder::AstrolabeBuilder, material::String)
      builder.astrolabe.material = material
      return builder
  end

  function etch_runes!(builder::AstrolabeBuilder, runes::Vector{String})
      append!(builder.astrolabe.runes, runes)
      return builder
  end

  function build(builder::AstrolabeBuilder)
      return builder.astrolabe
  end

  # Usage
  builder = AstrolabeBuilder()
  add_rings!(builder, 3)
  set_material!(builder, "Starmetal")
  etch_runes!(builder, ["Alpha", "Omega"])
  my_astrolabe = build(builder)
tags: [creational, builder, julia, astromancy]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
