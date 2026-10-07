---
title: The Chain of Responsibility
description: Pass an anomalous magical disturbance along a hierarchy of wards.
type: python
gofPattern: Chain of Responsibility
gofCategory: Behavioral
arcaneSchool: "Abjuration // Ward-Linking"
formula: |2
  from abc import ABC, abstractmethod

  class Ward(ABC):
      def __init__(self, next_ward=None):
          self._next_ward = next_ward

      def set_next(self, ward):
          self._next_ward = ward
          return ward

      @abstractmethod
      def handle(self, threat_level: int) -> str: pass

  class MinorWard(Ward):
      def handle(self, threat_level: int) -> str:
          if threat_level <= 10:
              return "Minor Ward dispelled the threat."
          elif self._next_ward:
              return self._next_ward.handle(threat_level)
          return "Threat breached all defenses!"

  class MajorWard(Ward):
      def handle(self, threat_level: int) -> str:
          if threat_level <= 50:
              return "Major Ward crushed the anomaly."
          elif self._next_ward:
              return self._next_ward.handle(threat_level)
          return "Threat breached all defenses!"

  class AegisOfArchimedes(Ward):
      def handle(self, threat_level: int) -> str:
          return "Aegis absorbed the cataclysm."

  # defense_system = MinorWard()
  # defense_system.set_next(MajorWard()).set_next(AegisOfArchimedes())
  # print(defense_system.handle(42))
tags: [behavioral, python, abjuration]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Chain of Responsibility decouples the sender of a threat from its ultimate handler. An anomaly strikes the outermost shield; if the shield cannot contain the raw energy, it passes the burden inward along the chain until a ward of sufficient power intercepts it.
