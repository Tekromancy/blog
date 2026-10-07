---
title: The Factory Method
description: Delegating artifact instantiation within strict build phases.
type: starlark
gofPattern: Factory Method
gofCategory: Creational
arcaneSchool: "Conjuration // Artifact Forging"
formula: |2
  def _fire_spell(power):
      return struct(element="fire", power=power, cast=lambda: "Casting fireball of power %s" % power)
  
  def _ice_spell(power):
      return struct(element="ice", power=power, cast=lambda: "Casting frost nova of power %s" % power)
  
  def spell_factory(spell_type, power=10):
      if spell_type == "fire":
          return _fire_spell(power)
      elif spell_type == "ice":
          return _ice_spell(power)
      fail("Unknown spell type requested from factory: " + spell_type)
      
  # Usage
  spell = spell_factory("ice", 50)
tags: [creational, starlark, hermetic]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

In the strict, single-pass evaluation model of Starlark, the **Factory Method** provides a critical layer of abstraction between the declaration of intent (in a BUILD file) and the actual implementation logic (in a .bzl extension). By invoking a factory method rather than a raw struct or rule directly, the Archmage can seamlessly swap out the underlying artifact generation logic across thousands of targets without breaking the hermetic interface.
