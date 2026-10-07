---
title: "The Memento: Temporal Phylactery"
description: "Capture and externalize an object's internal state so it can be restored later, without violating encapsulation."
type: gdscript
gofPattern: Memento
gofCategory: Behavioral
arcaneSchool: "Chronomancy // Phylacteries"
formula: |2
  class_name PlayerStateMemento extends RefCounted
  var health: int
  var position: Vector2
  func _init(h: int, p: Vector2) -> void:
      health = h
      position = p

  class_name PlayerCharacter extends Node2D
  var health: int = 100

  func create_memento() -> PlayerStateMemento:
      return PlayerStateMemento.new(health, position)

  func restore(memento: PlayerStateMemento) -> void:
      health = memento.health
      position = memento.position
tags: [godot, gdscript, memento, save-state, state]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
The Memento is a Chronomancer's finest tool. By locking the fragile state of an entity into a sealed Phylactery, one can rewind the flow of battle or manage save-game states effortlessly. The internal mysteries of the object remain private, yet its history is fully preserved.
