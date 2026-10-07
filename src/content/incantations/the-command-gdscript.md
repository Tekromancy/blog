---
title: "The Command: Sealed Directives"
description: "Encapsulate a request as an object, allowing parameterization, queuing, and undoing of actions."
type: gdscript
gofPattern: Command
gofCategory: Behavioral
arcaneSchool: "Evocation // Directives"
formula: |2
  class_name GameCommand extends RefCounted
  func execute() -> void: pass
  func undo() -> void: pass

  class_name MoveCommand extends GameCommand
  var target: Node2D
  var direction: Vector2
  var previous_pos: Vector2

  func _init(t: Node2D, dir: Vector2) -> void:
      target = t
      direction = dir

  func execute() -> void:
      previous_pos = target.position
      target.position += direction

  func undo() -> void:
      target.position = previous_pos
tags: [godot, gdscript, command, undo, inputs]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
The Command pattern captures an intent like a sealed scroll. By transforming logic into instantiated data objects, you can delay execution, sequence a queue of arcane instructions, or reverse time itself through undo operations. It is essential for tactical grids and complex input handling.
