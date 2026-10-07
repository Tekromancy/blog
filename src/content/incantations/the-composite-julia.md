---
title: Composite
description: Unify individual planets and entire star systems into a single tree using the Composite pattern in Julia.
type: julia
gofPattern: Composite
gofCategory: Structural
arcaneSchool: "Conjuration // Cosmic Topology"
formula: |2
  # Composite in Julia: Galaxy Clusters
  abstract type CelestialBody end

  struct Planet <: CelestialBody
      name::String
      mass::Float64
  end

  struct StarSystem <: CelestialBody
      name::String
      bodies::Vector{CelestialBody}
  end

  # Common interface
  get_mass(p::Planet) = p.mass
  function get_mass(sys::StarSystem)
      total_mass = 0.0
      for body in sys.bodies
          total_mass += get_mass(body)
      end
      return total_mass
  end

  # Usage
  earth = Planet("Earth", 5.97e24)
  mars = Planet("Mars", 6.39e23)

  sol_system = StarSystem("Sol System", [earth, mars])
  total = get_mass(sol_system)
  println("Total Mass of Sol System: ", total)
tags: [structural, composite, julia, astromancy]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
