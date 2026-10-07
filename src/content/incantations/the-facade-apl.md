---
title: The Facade
description: Conceal the terrifying complexity of the warp engine behind a simple activation glyph.
type: apl
gofPattern: Facade
gofCategory: Structural
arcaneSchool: "Illusion // Void-Masking"
formula: |2
  :Class MatterAntimatterInjector
      ∇ Inject
        :Access Public
        ⎕ ← 'Injecting ⍺ and ⍵...'
      ∇
  :EndClass

  :Class MagneticContainment
      ∇ Contain
        :Access Public
        ⎕ ← 'Magnetic fields locked ⍕⍎...'
      ∇
  :EndClass

  :Class SingularityCore
      ∇ Ignite
        :Access Public
        ⎕ ← 'Singularity born ⍟!'
      ∇
  :EndClass

  :Class WarpEngineFacade
      :Field Private Injector ← ⎕NEW MatterAntimatterInjector
      :Field Private Containment ← ⎕NEW MagneticContainment
      :Field Private Core ← ⎕NEW SingularityCore

      ∇ EngageWarp
        :Access Public
        Injector.Inject
        Containment.Contain
        Core.Ignite
      ∇
  :EndClass
tags: [apl, structural, alien, facade, warp-engine]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The operation of a Singularity Core requires precognitive multi-threading and an intimate understanding of magnetic containment (`⍕⍎`). To spare the ship's psychic pilot from this maddening complexity, the Facade pattern provides a single point of interaction: `EngageWarp`. By masking the underlying subsystem dependencies, the horrifying mechanics of space-folding become trivialized into a single command.
