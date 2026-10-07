---
title: Prototype
description: Clone intricate celestial constellations using the Prototype pattern in Julia.
type: julia
gofPattern: Prototype
gofCategory: Creational
arcaneSchool: "Illusion // Echoes"
formula: |2
  # Prototype in Julia: Cloning Constellations
  struct Star
      name::String
      magnitude::Float64
  end

  struct Constellation
      name::String
      stars::Vector{Star}
  end

  # In Julia, base copy logic works natively. We can override for deep copies.
  import Base: copy

  function copy(c::Constellation)
      # Deep copy the stars for true prototype pattern behavior
      cloned_stars = [Star(s.name, s.magnitude) for s in c.stars]
      return Constellation(c.name * " (Echo)", cloned_stars)
  end

  # Usage
  orion = Constellation("Orion", [Star("Betelgeuse", 0.42), Star("Rigel", 0.12)])
  orion_clone = copy(orion)
tags: [creational, prototype, julia, astromancy]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
