---
title: The Builder
description: Step-by-step assembly of complex magical constructs.
type: python
gofPattern: Builder
gofCategory: Creational
arcaneSchool: "Transmutation // Construct-Weaving"
formula: |2
  class Golem:
      def __init__(self):
          self.material = None
          self.core = None
          self.runes = []

      def __str__(self):
          return f"Golem(Material: {self.material}, Core: {self.core}, Runes: {self.runes})"

  class GolemBuilder:
      def __init__(self):
          self.golem = Golem()

      def set_material(self, material: str):
          self.golem.material = material
          return self

      def set_core(self, core: str):
          self.golem.core = core
          return self

      def add_rune(self, rune: str):
          self.golem.runes.append(rune)
          return self

      def build(self) -> Golem:
          return self.golem

  class Golemancer:
      @staticmethod
      def create_obsidian_golem(builder: GolemBuilder) -> Golem:
          return builder.set_material("Obsidian").set_core("Fire Element").add_rune("Strength").add_rune("Durability").build()

  # builder = GolemBuilder()
  # golem = Golemancer.create_obsidian_golem(builder)
tags: [creational, python, transmutation]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Builder pattern separates the construction of a complex golem from its representation. Instead of overwhelming the creation ritual with endless parameters, the Golemancer constructs the entity step-by-step, engraving runes and binding the elemental core in a precise sequence.
