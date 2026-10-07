---
title: The Mediator
description: Centralize chaotic communication among warring familiars.
type: python
gofPattern: Mediator
gofCategory: Behavioral
arcaneSchool: Enchantment // Pact-Binding
formula: |
  class PactMediator:
      def __init__(self):
          self.familiars = []
          
      def register(self, familiar):
          self.familiars.append(familiar)
          
      def broadcast(self, message: str, sender):
          for f in self.familiars:
              if f != sender:
                  f.receive(message)

  class Familiar:
      def __init__(self, name: str, mediator: PactMediator):
          self.name = name
          self.mediator = mediator
          self.mediator.register(self)
          
      def send(self, message: str):
          print(f"{self.name} sends: {message}")
          self.mediator.broadcast(message, self)
          
      def receive(self, message: str):
          print(f"[{self.name} received]: {message}")

  # mediator = PactMediator()
  # raven = Familiar("Raven", mediator)
  # imp = Familiar("Imp", mediator)
  # toad = Familiar("Toad", mediator)
  # raven.send("The master approaches!")
tags: [behavioral, python, enchantment]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

When multiple familiars vie for their summoner's attention, the resulting psychic noise can shatter a mind. The Mediator centralizes all telepathic bindings into a single Pact. Instead of N-to-N chaotic connections, each familiar speaks only to the Mediator, which routes the arcane whispers to the coven safely.
