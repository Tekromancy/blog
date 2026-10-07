---
title: The Memento
description: Capture and restore the fragile state of an alchemy experiment.
type: python
gofPattern: Memento
gofCategory: Behavioral
arcaneSchool: "Chronomancy // State Preservation"
formula: |2
  class CauldronMemento:
      def __init__(self, color: str, heat: int):
          self.color = color
          self.heat = heat

  class AlchemyCauldron:
      def __init__(self):
          self.color = "Clear"
          self.heat = 0

      def brew(self, ingredient: str):
          self.color = "Green" if ingredient == "Eye of Newt" else "Black"
          self.heat += 50

      def save_state(self) -> CauldronMemento:
          return CauldronMemento(self.color, self.heat)

      def restore_state(self, memento: CauldronMemento):
          self.color = memento.color
          self.heat = memento.heat

  # cauldron = AlchemyCauldron()
  # cauldron.brew("Eye of Newt")
  # save_point = cauldron.save_state()
  # cauldron.brew("Dragon Scale") # Explosion imminent!
  # cauldron.restore_state(save_point) # Back to safety
tags: [behavioral, python, chronomancy]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Memento pattern captures a snapshot of a highly volatile Alchemical Cauldron. Without violating encapsulation by exposing its internal chemical arrays, a Chronomancer can secure a temporal anchor, ready to rollback the brew the instant it turns dangerously black.
