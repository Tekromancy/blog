---
title: The Decorator of Augmented Scales
description: Dynamically attaching new behaviors to Speed Runes.
type: mojo
gofPattern: Decorator
gofCategory: Structural
arcaneSchool: "AI Serpent // Speed Runes"
formula: |2
  struct BaseSpeedRune:
      fn get_velocity(self) -> Int:
          return 100

  struct NitroDecorator:
      var wrapped_rune: BaseSpeedRune
      
      fn __init__(inout self, rune: BaseSpeedRune):
          self.wrapped_rune = rune
          
      fn get_velocity(self) -> Int:
          return self.wrapped_rune.get_velocity() * 3

  fn main():
      let base = BaseSpeedRune()
      let augmented = NitroDecorator(base)
      print("Base Velocity: " + str(base.get_velocity()))
      print("Augmented Velocity: " + str(augmented.get_velocity()))
tags: [structural, decorator, mojo, augmentation]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

# The Decorator of Augmented Scales

Sometimes, an AI Serpent requires temporary augmentation—a burst of nitro or an overlay of stealth—without permanently altering its core blueprint. The **Decorator** pattern wraps the original rune in a new shell.

This wrapper intercepts calls to methods like `get_velocity()`, amplifies or modifies the output, and returns it. It's the digital equivalent of layering armor plating over the snake's scales, enhancing its stats at runtime.
