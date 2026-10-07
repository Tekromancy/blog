---
title: The Command
description: Encapsulate spells as objects for queuing, logging, or undoing.
type: python
gofPattern: Command
gofCategory: Behavioral
arcaneSchool: Chronomancy // Temporal Queueing
formula: |
  from abc import ABC, abstractmethod

  class SpellCommand(ABC):
      @abstractmethod
      def execute(self): pass
      
      @abstractmethod
      def undo(self): pass

  class Target:
      def __init__(self):
          self.state = "Normal"
          
      def mutate(self, new_state: str):
          self.state = new_state

  class PolymorphCommand(SpellCommand):
      def __init__(self, target: Target, new_form: str):
          self.target = target
          self.new_form = new_form
          self.old_form = target.state

      def execute(self):
          self.target.mutate(self.new_form)
          
      def undo(self):
          self.target.mutate(self.old_form)

  class SpellInvoker:
      def __init__(self):
          self.history = []
          
      def cast(self, command: SpellCommand):
          command.execute()
          self.history.append(command)
          
      def rewind(self):
          if self.history:
              command = self.history.pop()
              command.undo()

  # victim = Target()
  # invoker = SpellInvoker()
  # toad_spell = PolymorphCommand(victim, "Toad")
  # invoker.cast(toad_spell)
  # invoker.rewind()
tags: [behavioral, python, chronomancy]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Command reifies a spellcast into an object, containing both the magical instruction and the temporal data required to reverse it. A master Chronomancer utilizes this to build vast invocation queues or to systematically unravel their own miscast polymorphs via an un-cast history list.
