---
title: The Prototype
description: Clone existing spell matrices to bypass expensive casting times.
type: python
gofPattern: Prototype
gofCategory: Creational
arcaneSchool: Illusion // Duplication
formula: |
  import copy

  class SpellMatrix:
      def __init__(self, name: str, complexity: int, runes: list):
          self.name = name
          self.complexity = complexity
          self.runes = runes
          
      def clone(self):
          return copy.deepcopy(self)
          
      def __str__(self):
          return f"{self.name} Matrix [Complexity: {self.complexity}, Runes: {self.runes}]"

  # original_spell = SpellMatrix("Abyssal Rift", 9001, ["Void", "Tear", "Chaos"])
  # cloned_spell = original_spell.clone()
  # cloned_spell.name = "Lesser Abyssal Rift"
  # cloned_spell.runes.remove("Chaos")
tags: [creational, python, illusion]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Prototype empowers mages to copy an already stabilized arcane structure. Rather than spending eons weaving the complex threads of reality from scratch, one duplicates the existing Spell Matrix and simply modifies the unstable edges. Perfect for rapid deployment of illusions and temporal clones.
