---
title: The Factory Method of Venom
description: Delegating the instantiation of AI Serpent runes using the Factory Method pattern.
type: mojo
gofPattern: Factory Method
gofCategory: Creational
arcaneSchool: "AI Serpent // Speed Runes"
formula: |2
  struct SerpentRune:
      var name: String
      fn __init__(inout self, name: String):
          self.name = name

  struct RuneForge:
      fn create_serpent_rune(self, rune_type: String) -> SerpentRune:
          if rune_type == "speed":
              return SerpentRune("Quantum Speed Serpent")
          elif rune_type == "venom":
              return SerpentRune("Toxic AI Serpent")
          else:
              return SerpentRune("Base Cyber Serpent")

  fn main():
      let forge = RuneForge()
      let rune = forge.create_serpent_rune("speed")
      print("Summoned: " + rune.name)
tags: [creational, factory-method, mojo, runes]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

# The Factory Method of Venom

The **Factory Method** provides an interface for creating objects in a superclass, but allows subclasses or specific factory structs to alter the type of objects that will be created.

In our cyber-magical domain, the `RuneForge` acts as the dispatcher. By supplying the desired rune essence (like `speed` or `venom`), the forge dynamically weaves the correct memory layout and lifecycle. Mojo's struct semantics keep this dispatch rapid and tightly packed in memory.
