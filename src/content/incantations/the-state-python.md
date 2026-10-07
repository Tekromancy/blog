---
title: The State
description: Alter an elemental's behavior when its internal phase shifts.
type: python
gofPattern: State
gofCategory: Behavioral
arcaneSchool: Transmutation // Phase Shifting
formula: |
  from abc import ABC, abstractmethod

  class ElementalState(ABC):
      @abstractmethod
      def attack(self) -> str: pass

  class SolidState(ElementalState):
      def attack(self) -> str: return "Crushing earth strike!"

  class LiquidState(ElementalState):
      def attack(self) -> str: return "Whipping water tendril!"

  class GaseousState(ElementalState):
      def attack(self) -> str: return "Suffocating toxic cloud!"

  class Elemental:
      def __init__(self, state: ElementalState):
          self.state = state
          
      def change_state(self, new_state: ElementalState):
          self.state = new_state
          
      def attack(self):
          return self.state.attack()

  # golem = Elemental(SolidState())
  # print(golem.attack())
  # golem.change_state(LiquidState())
  # print(golem.attack())
tags: [behavioral, python, transmutation]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The State pattern allows a mercurial Elemental to drastically shift its combat logic by hot-swapping its core essence at runtime. Rather than nesting abyssal chains of `if-else` blocks for Solid, Liquid, or Gaseous logic, each state encapsulates its own localized destruction algorithm.
