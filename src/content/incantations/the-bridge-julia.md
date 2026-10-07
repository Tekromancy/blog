---
title: Bridge
description: Separate spell constructs from their energy sources gracefully using the Bridge pattern in Julia.
type: julia
gofPattern: Bridge
gofCategory: Structural
arcaneSchool: Evocation // Energy Manipulation
formula: |
  # Bridge in Julia: Separation of Spell Construct and Energy Source
  abstract type EnergySource end
  struct VoidEnergy <: EnergySource end
  struct SolarEnergy <: EnergySource end
  
  drain(::VoidEnergy) = "Siphoning the dark..."
  drain(::SolarEnergy) = "Harnessing the sun..."
  
  abstract type SpellConstruct end
  
  struct SupernovaSpell <: SpellConstruct
      source::EnergySource
  end
  
  struct BlackHoleSpell <: SpellConstruct
      source::EnergySource
  end
  
  function cast(spell::SupernovaSpell)
      println(drain(spell.source), " Igniting the heavens!")
  end
  
  function cast(spell::BlackHoleSpell)
      println(drain(spell.source), " Collapsing spacetime!")
  end
  
  # Usage
  solar_supernova = SupernovaSpell(SolarEnergy())
  void_blackhole = BlackHoleSpell(VoidEnergy())
  
  cast(solar_supernova)
  cast(void_blackhole)
tags: [structural, bridge, julia, astromancy]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
