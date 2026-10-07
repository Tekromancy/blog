---
title: "The Singleton: The Omnipresent Nexus"
description: "Ensure a single, globally accessible instance governs the persistent state of your game."
type: gdscript
gofPattern: Singleton
gofCategory: Creational
arcaneSchool: "Conjuration // Nexus"
formula: |2
  # Configured in Godot as an Autoload (e.g., GameManager)
  extends Node

  var player_score: int = 0
  var global_entropy: float = 0.0

  func _ready() -> void:
      print("The Nexus is awakened.")

  func add_score(points: int) -> void:
      player_score += points
      
  func get_score() -> int:
      return player_score
tags: [godot, gdscript, autoload, singleton]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
In the Godot engine, the Singleton takes the form of an Autoload script—an omnipresent entity residing above the scene tree. It serves as the ultimate nexus for game state, ensuring that data persists across realm transitions and scene reloads, binding the game world together.
