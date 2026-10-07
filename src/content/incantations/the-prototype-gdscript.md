---
title: "The Prototype: Astral Cloning"
description: "Duplicate existing node structures and their state, avoiding the high cost of raw initialization."
type: gdscript
gofPattern: Prototype
gofCategory: Creational
arcaneSchool: "Illusion // Cloning"
formula: |2
  class_name SpellProjectile extends Area2D

  var damage: int = 10
  var element: String = "Void"

  # The Prototype clone method
  func clone() -> SpellProjectile:
      var copy = self.duplicate(DUPLICATE_USE_INSTANTIATION | DUPLICATE_SCRIPTS) as SpellProjectile
      copy.damage = self.damage
      copy.element = self.element
      return copy
tags: [godot, gdscript, prototype, clone]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
Within Godot's node hierarchy, cloning is an ancient trick of the trade. The Prototype pattern embraces the built-in `duplicate()` method, allowing the swift replication of fully configured prefabs. This bypasses the heavy initialization rituals and copies the precise runtime state of your astral constructs.
