---
title: The State Metamorphosis
description: Allow a familiar to completely alter its behavior when its internal elemental alignment shifts.
type: scala
gofPattern: State
gofCategory: Behavioral
arcaneSchool: Transmutation // Shapeshifting
formula: |
  sealed trait ElementalState {
    def attack(): String
  }

  case object Solid extends ElementalState {
    def attack(): String = "Smash with stone fist!"
  }

  case object Liquid extends ElementalState {
    def attack(): String = "Drown in a torrent!"
  }

  class Shapeshifter(var state: ElementalState) {
    def shift(newState: ElementalState): Unit = state = newState
    def strike(): Unit = println(state.attack())
  }
tags: [scala, behavioral, shapeshifting, state-machine]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
The State pattern removes massive `if/else` conditionals, delegating behavior directly to pure, isolated state objects. Shapeshifting made type-safe.
