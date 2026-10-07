---
title: "The Bridge: Separation of Realms"
description: "Decouple an abstraction from its implementation so the two can evolve independently."
type: gdscript
gofPattern: Bridge
gofCategory: Structural
arcaneSchool: "Transmutation // Decoupling"
formula: |2
  # Implementor
  class_name MovementEnchantment extends RefCounted
  func move(entity: Node2D, direction: Vector2, speed: float) -> void: pass

  # Concrete Implementors
  class_name GroundMovement extends MovementEnchantment
  func move(entity: Node2D, direction: Vector2, speed: float) -> void:
      entity.position += direction * speed

  class_name TeleportMovement extends MovementEnchantment
  func move(entity: Node2D, direction: Vector2, speed: float) -> void:
      entity.position += direction * (speed * 10.0) # instant jump

  # Abstraction
  class_name Character extends Node2D
  var _movement_type: MovementEnchantment

  func set_movement(movement: MovementEnchantment) -> void:
      _movement_type = movement

  func travel(direction: Vector2) -> void:
      if _movement_type:
          _movement_type.move(self, direction, 100.0)
tags: [godot, gdscript, bridge, decoupling]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
The Bridge severs the rigid inheritance tree, separating the conceptual entity from its physical execution in the engine. By composing an entity with an interchangeable movement or combat implementation, the artificer can alter a creature's fundamental nature at runtime without destroying the host.
