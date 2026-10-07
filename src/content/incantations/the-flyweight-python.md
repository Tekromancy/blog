---
title: The Flyweight
description: Conserve arcane memory by sharing intrinsic state among millions of particles.
type: python
gofPattern: Flyweight
gofCategory: Structural
arcaneSchool: Illusion // Swarm Mechanics
formula: |
  class SpiritEssence:
      # Intrinsic state: shared, immutable
      def __init__(self, color: str, glow_intensity: int):
          self.color = color
          self.glow_intensity = glow_intensity

  class EssenceFactory:
      _essences = {}
      
      @classmethod
      def get_essence(cls, color: str, glow_intensity: int) -> SpiritEssence:
          key = (color, glow_intensity)
          if key not in cls._essences:
              cls._essences[key] = SpiritEssence(color, glow_intensity)
          return cls._essences[key]

  class WillOWisp:
      # Extrinsic state: unique per particle
      def __init__(self, x: int, y: int, essence: SpiritEssence):
          self.x = x
          self.y = y
          self.essence = essence

      def render(self):
          return f"Wisp at ({self.x}, {self.y}) glowing {self.essence.color}"

  # factory = EssenceFactory()
  # blue_essence = factory.get_essence("Blue", 100)
  # wisp1 = WillOWisp(10, 20, blue_essence)
  # wisp2 = WillOWisp(15, 25, blue_essence)
tags: [structural, python, illusion]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

When conjuring a swarm of a million Will-O-Wisps, allocating memory for every shared property will crash the mage's mental processor. The Flyweight caches intrinsic essence (color, glow) into a singular shared node, leaving only spatial coordinates as unique instances.
