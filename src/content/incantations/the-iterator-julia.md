---
title: Iterator
description: Traverse expansive dark matter nebulae idiomatically with the Iterator pattern in Julia.
type: julia
gofPattern: Iterator
gofCategory: Behavioral
arcaneSchool: Divination // Spatial Traversal
formula: |
  # Iterator in Julia: Traversing a Nebula
  struct Nebula
      gas_clouds::Vector{String}
  end
  
  # In Julia, implementing the Base.iterate interface is the idiomatic standard
  import Base: iterate, length
  
  function iterate(n::Nebula, state=1)
      if state > length(n.gas_clouds)
          return nothing
      end
      return (n.gas_clouds[state], state + 1)
  end
  
  length(n::Nebula) = length(n.gas_clouds)
  
  # Usage
  orion_nebula = Nebula(["Hydrogen", "Helium", "Stardust", "Dark Matter"])
  
  for cloud in orion_nebula
      println("Navigating through: ", cloud)
  end
tags: [behavioral, iterator, julia, astromancy]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
