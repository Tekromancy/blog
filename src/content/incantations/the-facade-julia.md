---
title: Facade
description: Simplify deep-space observatory operations using the Facade pattern in Julia.
type: julia
gofPattern: Facade
gofCategory: Structural
arcaneSchool: "Abjuration // Simplicity Wards"
formula: |2
  # Facade in Julia: The Observatory Console
  module Subsystems
      struct LensController end
      focus(::LensController) = println("Lens focused to infinity.")

      struct MountMotor end
      rotate(::MountMotor, degrees::Float64) = println("Rotated ", degrees, " degrees.")

      struct SensorArray end
      capture(::SensorArray) = println("Photon data captured.")
  end

  # Facade
  struct ObservatoryFacade
      lens::Subsystems.LensController
      mount::Subsystems.MountMotor
      sensor::Subsystems.SensorArray
  end

  ObservatoryFacade() = ObservatoryFacade(Subsystems.LensController(), Subsystems.MountMotor(), Subsystems.SensorArray())

  function observe_target(facade::ObservatoryFacade, ra::Float64, dec::Float64)
      Subsystems.rotate(facade.mount, ra)
      Subsystems.focus(facade.lens)
      Subsystems.capture(facade.sensor)
      println("Observation complete.")
  end

  # Usage
  obs = ObservatoryFacade()
  observe_target(obs, 45.0, 90.0)
tags: [structural, facade, julia, astromancy]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
