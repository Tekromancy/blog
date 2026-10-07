---
title: The Facade Ward
description: Simplifying access to the arcane network.
type: pony
gofPattern: Facade
gofCategory: Structural
arcaneSchool: "Illusion // Simplification"
formula: |2
  class val FortressFacade
    let _gate: GateControl val
    let _wards: WardMatrix val
    new create(g: GateControl val, w: WardMatrix val) =>
      _gate = g
      _wards = w
    fun secure() =>
      _gate.close()
      _wards.activate()
tags: [pony, facade]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

## The Facade Ward

A simple facade masks the complexity of the underlying spell network, coordinating safe access to multiple subsystems.
