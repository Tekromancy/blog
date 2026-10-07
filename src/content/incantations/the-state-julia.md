---
title: State
description: Model the stellar evolution lifecycles with the State pattern in Julia.
type: julia
gofPattern: State
gofCategory: Behavioral
arcaneSchool: "Transmutation // Cosmic Alchemy"
formula: |2
  # State in Julia: Stellar Evolution
  abstract type StarState end

  struct Protostar <: StarState end
  struct MainSequence <: StarState end
  struct RedGiant <: StarState end
  struct WhiteDwarf <: StarState end

  mutable struct EvolvingStar
      state::StarState
      mass::Float64
  end

  evolve!(star::EvolvingStar, ::Protostar) = star.state = MainSequence()
  evolve!(star::EvolvingStar, ::MainSequence) = star.state = RedGiant()
  evolve!(star::EvolvingStar, ::RedGiant) = star.state = WhiteDwarf()
  evolve!(star::EvolvingStar, ::WhiteDwarf) = println("Star is dead. Cannot evolve further.")

  function time_pass!(star::EvolvingStar)
      println("Billions of years pass... Current state: ", typeof(star.state))
      evolve!(star, star.state)
  end

  # Usage
  sun = EvolvingStar(Protostar(), 1.0)
  time_pass!(sun)
  time_pass!(sun)
  time_pass!(sun)
  time_pass!(sun)
tags: [behavioral, state, julia, astromancy]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
