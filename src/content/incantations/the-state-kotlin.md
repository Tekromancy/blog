---
title: The State Hex
description: Altering behavior dynamically based on inner alignment.
type: kotlin
gofPattern: State
gofCategory: Behavioral
arcaneSchool: "Transmutation // Shifting"
formula: |2
  interface FamiliarState {
      fun interact()
  }

  class CalmState : FamiliarState {
      override fun interact() = println("Familiar purrs.")
  }

  class EnragedState : FamiliarState {
      override fun interact() = println("Familiar spits fire!")
  }

  class Familiar {
      var state: FamiliarState = CalmState()
      fun poke() = state.interact()
  }
tags: [kotlin, behavioral, state]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
# The State Hex

An entity whose behavior violently shifts based on internal configurations is a ticking time bomb of `if-else` conditionals. The State Hex extracts these behaviors into discrete state objects. By swapping the state reference at runtime, a Familiar transitions seamlessly from calm to enraged without tangled logic.
