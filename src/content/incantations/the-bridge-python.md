---
title: The Bridge
description: Decouple the spell's abstraction from its elemental implementation.
type: python
gofPattern: Bridge
gofCategory: Structural
arcaneSchool: "Evocation // Metamagic"
formula: |2
  from abc import ABC, abstractmethod

  class Element(ABC):
      @abstractmethod
      def apply(self) -> str: pass

  class Fire(Element):
      def apply(self) -> str: return "wreathed in flames"

  class Void(Element):
      def apply(self) -> str: return "infused with abyssal energy"

  class Spell(ABC):
      def __init__(self, element: Element):
          self.element = element

      @abstractmethod
      def cast(self) -> str: pass

  class Strike(Spell):
      def cast(self) -> str:
          return f"A kinetic strike, {self.element.apply()}!"

  class Ward(Spell):
      def cast(self) -> str:
          return f"A protective ward, {self.element.apply()}!"

  # fire_strike = Strike(Fire())
  # void_ward = Ward(Void())
  # print(fire_strike.cast())
tags: [structural, python, evocation]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Bridge pattern weaves the spell's form (Strike or Ward) independently from its substance (Fire or Void). This dimensional decoupling prevents the catastrophic exponential explosion of creating separate classes for FireStrike, VoidStrike, FireWard, and VoidWard. Metamagic at its finest.
