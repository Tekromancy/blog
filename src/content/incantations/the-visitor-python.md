---
title: The Visitor
description: Apply new arcane operations over an entire bestiary structure.
type: python
gofPattern: Visitor
gofCategory: Behavioral
arcaneSchool: "Divination // Taxonomy"
formula: |2
  from abc import ABC, abstractmethod

  class Creature(ABC):
      @abstractmethod
      def accept(self, visitor): pass

  class Dragon(Creature):
      def accept(self, visitor):
          visitor.visit_dragon(self)

  class Griffin(Creature):
      def accept(self, visitor):
          visitor.visit_griffin(self)

  class SpellVisitor(ABC):
      @abstractmethod
      def visit_dragon(self, dragon: Dragon): pass

      @abstractmethod
      def visit_griffin(self, griffin: Griffin): pass

  class ScanWeaknessVisitor(SpellVisitor):
      def visit_dragon(self, dragon: Dragon):
          print("Dragon weakness: Underbelly scales.")

      def visit_griffin(self, griffin: Griffin):
          print("Griffin weakness: Aerial immobility during dive.")

  # creatures = [Dragon(), Griffin()]
  # scanner = ScanWeaknessVisitor()
  # for c in creatures:
  #     c.accept(scanner)
tags: [behavioral, python, divination]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Visitor pattern separates an algorithm from the object structure it operates on. By defining a Spell Visitor, a magus can cast a completely new mass-analysis spell (like scanning for weaknesses) across a heterogeneous array of bestiary creatures without having to modify the creatures' underlying arcane structures.
