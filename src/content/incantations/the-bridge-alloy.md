---
title: "The Bridge: Decoupling the Ethereal from the Material"
description: "Decouple an abstraction from its implementation so that the two can vary independently."
type: alloy
gofPattern: Bridge
gofCategory: Structural
arcaneSchool: "Transmutation // Ethereal-Tethering"
formula: |2
  abstract sig EtherealCore {
    pulse: lone Energy
  }
  sig VoidCore, PlasmaCore extends EtherealCore {}
  
  abstract sig MaterialVessel {
    core: one EtherealCore,
    emit: lone Energy
  }
  {
    emit = core.pulse
  }
  
  sig DroneVessel, ArmorVessel extends MaterialVessel {}
  
  sig Energy {}
  
  pred test_bridge[v: DroneVessel] {
    some v.emit
  }
  
  run test_bridge for 3
tags: [structural, bridge, decoupling]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

# The Bridge: Decoupling the Ethereal from the Material

A Vessel needs a Core, but tying a specific Vessel to a specific Core creates rigid architectures. In Alloy, the Bridge pattern allows the `MaterialVessel` to retain a reference to the abstract `EtherealCore`. The operation (`emit`) simply delegates its relational output to the implementation (`core.pulse`).
