---
title: The Decorator
description: Dynamically attach new meta-magical properties to an artifact.
type: python
gofPattern: Decorator
gofCategory: Structural
arcaneSchool: "Transmutation // Aura Weaving"
formula: |2
  from abc import ABC, abstractmethod

  class Artifact(ABC):
      @abstractmethod
      def power_level(self) -> int: pass

      @abstractmethod
      def description(self) -> str: pass

  class BaseAmulet(Artifact):
      def power_level(self) -> int: return 10
      def description(self) -> str: return "A simple amulet"

  class ArtifactDecorator(Artifact):
      def __init__(self, artifact: Artifact):
          self.artifact = artifact

      def power_level(self) -> int: return self.artifact.power_level()
      def description(self) -> str: return self.artifact.description()

  class GlowingAura(ArtifactDecorator):
      def power_level(self) -> int: return self.artifact.power_level() + 5
      def description(self) -> str: return self.artifact.description() + " [Glowing]"

  class CursedBinding(ArtifactDecorator):
      def power_level(self) -> int: return self.artifact.power_level() * 2
      def description(self) -> str: return self.artifact.description() + " [Cursed]"

  # my_amulet = BaseAmulet()
  # my_amulet = GlowingAura(my_amulet)
  # my_amulet = CursedBinding(my_amulet)
  # print(f"{my_amulet.description()} | Power: {my_amulet.power_level()}")
tags: [structural, python, transmutation]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

Through the Decorator pattern, one stacks enchantments onto a base artifact dynamically at runtime. Instead of permanently fusing properties and causing structural decay, layers of magical auras wrap around the object, augmenting its stats and descriptions infinitely.
