---
title: Factory Method
description: Forge arcane lenses through multiple dispatch with the Factory Method pattern in Julia.
type: julia
gofPattern: Factory Method
gofCategory: Creational
arcaneSchool: Conjuration // Celestial Forging
formula: |
  # Factory Method in Julia: Forging Telescopes
  abstract type DivinationLens end
  struct OpticalLens <: DivinationLens end
  struct AetherLens <: DivinationLens end
  
  abstract type LensCrafter end
  struct MundaneCrafter <: LensCrafter end
  struct ArcaneCrafter <: LensCrafter end
  
  forge_lens(::MundaneCrafter) = OpticalLens()
  forge_lens(::ArcaneCrafter) = AetherLens()
  
  function peer_into_void(crafter::LensCrafter)
      lens = forge_lens(crafter)
      println("Peering through a ", typeof(lens))
  end
  
  # Usage
  crafter = ArcaneCrafter()
  peer_into_void(crafter)
tags: [creational, factory, julia, astromancy]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
