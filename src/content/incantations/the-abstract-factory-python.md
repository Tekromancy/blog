---
title: The Abstract Factory
description: Conjure families of related arcane artifacts without specifying their concrete classes.
type: python
gofPattern: Abstract Factory
gofCategory: Creational
arcaneSchool: Conjuration // Artifice
formula: |
  from abc import ABC, abstractmethod

  class Spellbook(ABC):
      @abstractmethod
      def read(self) -> str: pass

  class Wand(ABC):
      @abstractmethod
      def cast(self) -> str: pass

  class PyromancySpellbook(Spellbook):
      def read(self) -> str: return "Reading pyromancy incantations..."

  class PyromancyWand(Wand):
      def cast(self) -> str: return "Casting a fireball!"

  class CryomancySpellbook(Spellbook):
      def read(self) -> str: return "Reading cryomancy incantations..."

  class CryomancyWand(Wand):
      def cast(self) -> str: return "Casting an ice shard!"

  class ArcaneFactory(ABC):
      @abstractmethod
      def create_spellbook(self) -> Spellbook: pass
      
      @abstractmethod
      def create_wand(self) -> Wand: pass

  class PyromancyFactory(ArcaneFactory):
      def create_spellbook(self) -> Spellbook: return PyromancySpellbook()
      def create_wand(self) -> Wand: return PyromancyWand()

  class CryomancyFactory(ArcaneFactory):
      def create_spellbook(self) -> Spellbook: return CryomancySpellbook()
      def create_wand(self) -> Wand: return CryomancyWand()

  def gear_up(factory: ArcaneFactory):
      book = factory.create_spellbook()
      wand = factory.create_wand()
      print(book.read())
      print(wand.cast())

  # gear_up(PyromancyFactory())
tags: [creational, python, conjuration]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Abstract Factory weaves creation at a higher level, allowing an adept to manifest a matched set of magical artifacts—wands and spellbooks bound by the same elemental affinity. By defining a metaphysical interface, one ensures that fire never mixes dangerously with ice in the initiate's toolkit.
