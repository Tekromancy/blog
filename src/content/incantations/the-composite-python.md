---
title: The Composite
description: Treat individual runes and complex sigils uniformly.
type: python
gofPattern: Composite
gofCategory: Structural
arcaneSchool: Enchantment // Sigil Crafting
formula: |
  from abc import ABC, abstractmethod

  class MagicalComponent(ABC):
      @abstractmethod
      def activate(self) -> str: pass

  class Rune(MagicalComponent):
      def __init__(self, name: str):
          self.name = name

      def activate(self) -> str:
          return f"Glowing rune of {self.name}"

  class Sigil(MagicalComponent):
      def __init__(self, name: str):
          self.name = name
          self.components = []

      def add(self, component: MagicalComponent):
          self.components.append(component)

      def activate(self) -> str:
          results = [c.activate() for c in self.components]
          return f"Sigil {self.name} pulses: [" + ", ".join(results) + "]"

  # fire = Rune("Fire")
  # air = Rune("Air")
  # storm_sigil = Sigil("Storm")
  # storm_sigil.add(fire)
  # storm_sigil.add(air)
  # print(storm_sigil.activate())
tags: [structural, python, enchantment]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Composite pattern models a true magical hierarchy. A simple Rune and a vast, intricate Sigil composed of dozens of runes can both be activated with the exact same incantation. This fractal nature of spellcraft allows archmages to build infinitely deep trees of power.
