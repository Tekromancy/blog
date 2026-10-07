---
title: The Adapter
description: Translate human standard telemetry into ancient alien geometries.
type: apl
gofPattern: Adapter
gofCategory: Structural
arcaneSchool: "Transmutation // Geometry-Translation"
formula: |2
  :Class HumanTelemetry
      ∇ R←GetData
        :Access Public
        R ← 1 2 3 4 5
      ∇
  :EndClass

  :Class AlienMatrix
      ∇ Inscribe Matrix
        :Access Public
        ⍝ Requires a 2D matrix
        ⎕ ← 'Inscribed: ' , ⍕⍴Matrix
      ∇
  :EndClass

  :Class TelemetryAdapter
      :Field Private HumanSensor

      ∇ Make Sensor
        :Access Public
        :Implements Constructor
        HumanSensor ← Sensor
      ∇

      ∇ Inscribe
        :Access Public
        ⍝ Convert 1D vector to 2D alien matrix ⍉⍴
        AlienMatrixObj ← ⎕NEW AlienMatrix
        Data ← HumanSensor.GetData
        AlienMatrixObj.Inscribe (2 (⌈0.5×≢Data) ⍴ Data,0)
      ∇
  :EndClass
tags: [apl, structural, alien, adapter, translation]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Adapter serves as a xenolinguistic bridge between our linear, flat human arrays and the hyper-folded dimensional matrices expected by ancient alien technology. When the `AlienMatrix` demands a rigid multi-dimensional array, the `TelemetryAdapter` dynamically reshapes (`⍴`) and pads the 1D human sensory data into an acceptable form, allowing the human interface to seamlessly commune with the cosmic obelisk.
