---
title: Singleton
description: Tap into universal constants efficiently via the Singleton pattern in Julia.
type: julia
gofPattern: Singleton
gofCategory: Creational
arcaneSchool: "Universal // Fundamental Forces"
formula: |2
  # Singleton in Julia: The Universal Constants
  mutable struct UniversalTome
      gravitational_constant::Float64
      speed_of_light::Float64
  end

  # Use a const reference to hold the singleton instance
  const THE_TOME = UniversalTome(6.67430e-11, 299792458.0)

  # Accessor function to get the instance
  function get_tome()
      return THE_TOME
  end

  # Usage
  tome1 = get_tome()
  tome2 = get_tome()
  # tome1 === tome2 evaluates to true
tags: [creational, singleton, julia, astromancy]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
