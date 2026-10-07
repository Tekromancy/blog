---
title: "The Decorator: Enchantment Overlays"
description: "Attach additional responsibilities and magical properties to objects dynamically."
type: gdscript
gofPattern: Decorator
gofCategory: Structural
arcaneSchool: "Transmutation // Enchanting"
formula: |2
  class_name BaseAttack extends RefCounted
  func get_damage() -> int:
      return 10
      
  class_name AttackDecorator extends BaseAttack
  var _base: BaseAttack
  func _init(base: BaseAttack) -> void:
      _base = base
  func get_damage() -> int:
      return _base.get_damage()

  # Concrete Decorators
  class_name FireEnchantment extends AttackDecorator
  func get_damage() -> int:
      return _base.get_damage() + 5

  class_name VoidEnchantment extends AttackDecorator
  func get_damage() -> int:
      return _base.get_damage() * 2
tags: [godot, gdscript, decorator, enchantment]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
Through the Decorator, one wraps standard abilities in layers of arcane modifiers. In the context of the engine, this allows for the composition of stats, buffs, and curses without resorting to a bloated class hierarchy. Each decorator intercepts and transmutes the request before passing it to the core entity.
