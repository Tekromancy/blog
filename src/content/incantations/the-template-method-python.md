---
title: The Template Method
description: Define the skeleton of an alchemy ritual, deferring exact ingredients.
type: python
gofPattern: Template Method
gofCategory: Behavioral
arcaneSchool: "Transmutation // Alchemy"
formula: |2
  from abc import ABC, abstractmethod

  class AlchemyRitual(ABC):
      def perform_ritual(self):
          self.ignite_flame()
          self.add_ingredients()
          self.chant()
          self.distill()

      def ignite_flame(self):
          print("Lighting the alchemical burner.")

      def distill(self):
          print("Distilling the essence into a vial.")

      @abstractmethod
      def add_ingredients(self): pass

      @abstractmethod
      def chant(self): pass

  class ElixirOfLife(AlchemyRitual):
      def add_ingredients(self):
          print("Adding Phoenix Tear and Unicorn Blood.")

      def chant(self):
          print("Chanting the hymn of dawn.")

  # ritual = ElixirOfLife()
  # ritual.perform_ritual()
tags: [behavioral, python, transmutation]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Template Method enforces the unbreakable sequence of a high-tier Alchemy Ritual. The base class dictates that one must ALWAYS ignite the flame before adding ingredients, preventing catastrophic sequence breaks, while subclasses are forced to provide only the unique components and specific chants.
