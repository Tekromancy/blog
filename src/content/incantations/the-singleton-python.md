---
title: The Singleton
description: Ensure the existence of only one Nexus in the entire realm.
type: python
gofPattern: Singleton
gofCategory: Creational
arcaneSchool: Abjuration // Leyline Binding
formula: |
  class LeylineNexus:
      _instance = None

      def __new__(cls, *args, **kwargs):
          if not cls._instance:
              cls._instance = super(LeylineNexus, cls).__new__(cls, *args, **kwargs)
              cls._instance.energy_level = 100
          return cls._instance

      def drain(self, amount: int):
          self.energy_level -= amount
          return self.energy_level

  # nexus1 = LeylineNexus()
  # nexus2 = LeylineNexus()
  # nexus1.drain(10)
  # assert nexus1 is nexus2
tags: [creational, python, abjuration]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Singleton binds a specific metaphysical entity so firmly to reality that any attempt to summon it again merely points to the original manifestation. The Leyline Nexus must remain unique; multiple nexuses would tear the spatial fabric asunder.
