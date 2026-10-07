---
title: "The Chain of Responsibility: Cascade of Runes"
description: "Pass requests along a chain of handlers until one resolves the invocation."
type: gdscript
gofPattern: Chain of Responsibility
gofCategory: Behavioral
arcaneSchool: "Evocation // Cascading"
formula: |2
  class_name DamageHandler extends Node

  var next_handler: DamageHandler

  func set_next(handler: DamageHandler) -> DamageHandler:
      next_handler = handler
      return handler

  func handle_damage(amount: int, type: String) -> void:
      if next_handler:
          next_handler.handle_damage(amount, type)

  # Concrete Handlers
  class_name ShieldHandler extends DamageHandler
  func handle_damage(amount: int, type: String) -> void:
      if type == "Energy":
          print("Shield absorbed energy damage.")
      else:
          super.handle_damage(amount, type)

  class_name ArmorHandler extends DamageHandler
  func handle_damage(amount: int, type: String) -> void:
      if type == "Physical":
          print("Armor mitigated physical damage.")
      else:
          super.handle_damage(amount, type)
tags: [godot, gdscript, chain, behavior]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
When a system takes a blow, the impact ripples through the astral shields. The Chain of Responsibility forms a linked succession of defenses and handlers. A request—be it damage, an event, or an input—flows down this chain until a specialized rune intercepts and dissipates the invocation.
