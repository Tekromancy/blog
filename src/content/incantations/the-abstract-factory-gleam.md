---
title: The Abstract Factory
description: A pure functional approach to the Abstract Factory pattern in Gleam.
type: gleam
gofPattern: Abstract Factory
gofCategory: Creational
arcaneSchool: "Conjuration // Type-Safe Alchemy"
formula: |2
  pub type ElementalTheme {
    Fire
    Water
  }

  pub type Staff {
    FireStaff(power: Int)
    WaterStaff(flow: Int)
  }

  pub type Robe {
    FireRobe(defense: Int)
    WaterRobe(ward: Int)
  }

  pub type AbstractForge {
    AbstractForge(
      create_staff: fn() -> Staff,
      create_robe: fn() -> Robe,
    )
  }

  pub fn get_forge(theme: ElementalTheme) -> AbstractForge {
    case theme {
      Fire -> AbstractForge(
        create_staff: fn() { FireStaff(10) },
        create_robe: fn() { FireRobe(5) },
      )
      Water -> AbstractForge(
        create_staff: fn() { WaterStaff(8) },
        create_robe: fn() { WaterRobe(7) },
      )
    }
  }
tags: [conjuration, factory, gleam]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
# The Abstract Factory
In the Beam Machine, factories are merely records of pure functions that conjure elements of the same elemental affinity.
