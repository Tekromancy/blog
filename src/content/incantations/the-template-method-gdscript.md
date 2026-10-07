---
title: "The Template Method: Ritual Skeleton"
description: "Define the skeleton of an algorithm in an operation, deferring some steps to subclasses."
type: gdscript
gofPattern: Template Method
gofCategory: Behavioral
arcaneSchool: "Evocation // Rituals"
formula: |2
  class_name CraftingRitual extends RefCounted

  # The Template Method
  func perform_ritual() -> void:
      prepare_materials()
      chant_incantation()
      finish_item()

  func prepare_materials() -> void:
      push_error("Must be overridden")
      
  func chant_incantation() -> void:
      push_error("Must be overridden")
      
  func finish_item() -> void:
      print("Item crafted successfully.")

  # Concrete subclass
  class_name PotionCrafting extends CraftingRitual
  func prepare_materials() -> void:
      print("Gathering herbs and water.")
      
  func chant_incantation() -> void:
      print("Whispering the healing words.")
tags: [godot, gdscript, template, inheritance]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
Some arcane processes must follow a strict, invariable sequence, yet the specifics of each step vary wildly. The Template Method establishes the inviolable skeleton of the ritual. Subclasses weave their own unique magic into the designated hooks, ensuring the foundational laws of the operation are never broken.
