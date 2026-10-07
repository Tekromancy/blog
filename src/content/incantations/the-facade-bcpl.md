---
title: The Facade of the Eldritch Gateway
description: Provide a unified, simplified interface to the incomprehensible chaos of the void subsystems.
type: bcpl
gofPattern: Facade
gofCategory: Structural
arcaneSchool: "Abjuration // Sigilry"
formula: |2
  GET "libhdr"

  // Complex Subsystems
  LET InitDimensionalRift() BE writef("Rift Initialized.*n")
  LET StabilizeDarkMatter() BE writef("Dark Matter Stabilized.*n")
  LET BindAstralTethers() BE writef("Tethers Bound.*n")

  // The Facade
  LET OpenVoidGateway() BE $(
    writef("Opening Eldritch Gateway...*n")
    InitDimensionalRift()
    StabilizeDarkMatter()
    BindAstralTethers()
    writef("Gateway is Open.*n")
  $)

  LET START() BE $(
    OpenVoidGateway()
  $)
tags: [facade, gateway, void]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
