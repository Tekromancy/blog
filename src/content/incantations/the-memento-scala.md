---
title: The Memento Crystal
description: Capture a snapshot of an artifact's state so it can be restored if an experiment goes disastrously wrong.
type: scala
gofPattern: Memento
gofCategory: Behavioral
arcaneSchool: "Chronomancy // Time Reversal"
formula: |2
  case class TimeCrystal(state: String) // The Memento

  class AlchemistFlask {
    private var potionColor: String = "Clear"

    def addIngredient(color: String): Unit = potionColor = color
    def save(): TimeCrystal = TimeCrystal(potionColor)
    def restore(crystal: TimeCrystal): Unit = potionColor = crystal.state
    def current: String = potionColor
  }
tags: [scala, behavioral, chronomancy, state-saving]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
Using a case class as an immutable token, the Memento pattern allows the pure preservation of state without violating encapsulation. True Chronomancy in practice.
