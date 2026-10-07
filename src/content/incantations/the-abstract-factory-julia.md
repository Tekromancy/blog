---
title: Abstract Factory
description: Master the Abstract Factory pattern in Julia for complex celestial object creation.
type: julia
gofPattern: Abstract Factory
gofCategory: Creational
arcaneSchool: Conjuration // Astromancy
formula: |
  # Abstract Factory in Julia utilizing Multiple Dispatch
  abstract type CelestialBodyFactory end
  struct StarFactory <: CelestialBodyFactory end
  struct PlanetFactory <: CelestialBodyFactory end
  
  abstract type CelestialCore end
  abstract type CelestialAura end
  
  struct PlasmaCore <: CelestialCore end
  struct RockCore <: CelestialCore end
  struct SolarWind <: CelestialAura end
  struct Atmosphere <: CelestialAura end
  
  # Multiple dispatch handles the creation
  create_core(::StarFactory) = PlasmaCore()
  create_aura(::StarFactory) = SolarWind()
  create_core(::PlanetFactory) = RockCore()
  create_aura(::PlanetFactory) = Atmosphere()
  
  function invoke_creation(factory::CelestialBodyFactory)
      core = create_core(factory)
      aura = create_aura(factory)
      return (core, aura)
  end
  
  # Usage
  star_factory = StarFactory()
  star_core, star_aura = invoke_creation(star_factory)
tags: [creational, factory, julia, astromancy]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
