---
title: Proxy
description: Guard forbidden cosmic incantations using lazy instantiation via the Proxy pattern in Julia.
type: julia
gofPattern: Proxy
gofCategory: Structural
arcaneSchool: Abjuration // Ethereal Wards
formula: |
  # Proxy in Julia: Guarding the Forbidden Grimoire
  abstract type Grimoire end
  
  struct RealGrimoire <: Grimoire
      spells::Vector{String}
  end
  RealGrimoire() = RealGrimoire(["Nova", "Singularity", "Chronoshift"])
  
  read_spells(g::RealGrimoire) = g.spells
  
  mutable struct GrimoireProxy <: Grimoire
      real_grimoire::Union{RealGrimoire, Nothing}
      clearance_level::Int
  end
  GrimoireProxy(level::Int) = GrimoireProxy(nothing, level)
  
  function read_spells(p::GrimoireProxy)
      if p.clearance_level < 5
          error("Access Denied: Insufficient astromantic clearance.")
      end
      
      # Lazy initialization
      if isnothing(p.real_grimoire)
          println("Materializing the Real Grimoire from the void...")
          p.real_grimoire = RealGrimoire()
      end
      return read_spells(p.real_grimoire)
  end
  
  # Usage
  proxy = GrimoireProxy(6)
  spells = read_spells(proxy)
  println("Unveiled spells: ", spells)
tags: [structural, proxy, julia, astromancy]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
