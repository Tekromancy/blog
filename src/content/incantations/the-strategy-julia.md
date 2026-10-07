---
title: Strategy
description: Swap hyperspace navigation modalities seamlessly utilizing the Strategy pattern in Julia.
type: julia
gofPattern: Strategy
gofCategory: Behavioral
arcaneSchool: Conjuration // Teleportation
formula: |
  # Strategy in Julia: Navigation through Hyperspace
  abstract type NavigationStrategy end
  
  struct WarpDrive <: NavigationStrategy end
  struct WormholeJump <: NavigationStrategy end
  struct SolarSail <: NavigationStrategy end
  
  # The Context
  struct Starship
      name::String
      nav::NavigationStrategy
  end
  
  # In Julia, strategy is elegantly handled by passing functions or types and leveraging multiple dispatch
  navigate(::WarpDrive, dist::Float64) = dist / 10.0
  navigate(::WormholeJump, dist::Float64) = 0.0 # Instantaneous
  navigate(::SolarSail, dist::Float64) = dist / 0.1
  
  function travel(ship::Starship, distance::Float64)
      time_taken = navigate(ship.nav, distance)
      println("$(ship.name) arrived in $(time_taken) cosmic cycles.")
  end
  
  # Usage
  voyager = Starship("Voyager", WarpDrive())
  travel(voyager, 1000.0)
  
  ikarus = Starship("Ikarus", SolarSail())
  travel(ikarus, 1000.0)
tags: [behavioral, strategy, julia, astromancy]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
