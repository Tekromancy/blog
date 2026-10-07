---
title: The Observer
description: Notify a network of scrying orbs when an astral event occurs.
type: python
gofPattern: Observer
gofCategory: Behavioral
arcaneSchool: Divination // Prophecy Broadcasting
formula: |
  class AstralEventPublisher:
      def __init__(self):
          self._observers = []
          
      def attach(self, observer):
          self._observers.append(observer)
          
      def notify(self, event_data: str):
          for obs in self._observers:
              obs.update(event_data)

  class ScryingOrb:
      def __init__(self, location: str):
          self.location = location
          
      def update(self, event_data: str):
          print(f"Orb at {self.location} glowing: {event_data}")

  # nexus = AstralEventPublisher()
  # nexus.attach(ScryingOrb("High Tower"))
  # nexus.attach(ScryingOrb("Deep Dungeon"))
  # nexus.notify("Blood Moon Rises!")
tags: [behavioral, python, divination]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Observer implements a decentralized web of awareness. A central Astral Nexus maintains a list of bound Scrying Orbs; when a celestial alignment shifts, it pushes a broadcast update to the network. Observers passively await their updates without polling the heavy cosmos continuously.
