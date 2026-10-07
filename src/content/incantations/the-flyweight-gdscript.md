---
title: "The Flyweight: Shared Astral Essence"
description: "Minimize memory usage by sharing as much data as possible among similar objects."
type: gdscript
gofPattern: Flyweight
gofCategory: Structural
arcaneSchool: "Transmutation // Optimization"
formula: |2
  # Flyweight data
  class_name BulletData extends Resource
  @export var texture: Texture2D
  @export var speed: float
  @export var damage: int

  # Context
  class_name Bullet extends Node2D
  var data: BulletData # Shared reference
  var direction: Vector2 # Unique state

  func _process(delta: float) -> void:
      position += direction * data.speed * delta
tags: [godot, gdscript, flyweight, optimization, resources]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
In the fury of a bullet-hell conjuration, spawning thousands of projectiles can shatter your memory constraints. The Flyweight pattern binds intrinsic, immutable data (like textures and base stats) into a shared Godot Resource, leaving only the volatile positioning data to the individual nodes.
