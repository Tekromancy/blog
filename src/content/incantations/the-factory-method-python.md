---
title: The Factory Method
description: Defer the exact manifestation of a familiar to subclasses.
type: python
gofPattern: Factory Method
gofCategory: Creational
arcaneSchool: "Conjuration // Summoning"
formula: |2
  from abc import ABC, abstractmethod

  class Familiar(ABC):
      @abstractmethod
      def act(self) -> str: pass

  class RavenFamiliar(Familiar):
      def act(self) -> str: return "The raven scouts the arcane perimeter."

  class ImpFamiliar(Familiar):
      def act(self) -> str: return "The imp whispers forbidden secrets."

  class SummoningCircle(ABC):
      @abstractmethod
      def summon(self) -> Familiar: pass

      def perform_ritual(self) -> str:
          familiar = self.summon()
          return f"Ritual complete! {familiar.act()}"

  class RavenCircle(SummoningCircle):
      def summon(self) -> Familiar: return RavenFamiliar()

  class ImpCircle(SummoningCircle):
      def summon(self) -> Familiar: return ImpFamiliar()

  # circle = ImpCircle()
  # print(circle.perform_ritual())
tags: [creational, python, conjuration]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

Through the Factory Method, a generalized Summoning Circle dictates the overall ritual structure but leaves the precise choice of entity—a raven or an imp—to specific covens (subclasses). This allows for boundless expansion of the summoning compendium without altering the fundamental ritual framework.
