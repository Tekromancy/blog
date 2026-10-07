---
title: "The Strategy: The Tactician's Tome"
description: "Define a family of algorithms, encapsulate each one, and make them interchangeable at runtime."
type: gdscript
gofPattern: Strategy
gofCategory: Behavioral
arcaneSchool: "Divination // Tactics"
formula: |2
  class_name PathfindingStrategy extends RefCounted
  func find_path(start: Vector2, end: Vector2) -> Array[Vector2]:
      return []

  class_name AStarStrategy extends PathfindingStrategy
  func find_path(start: Vector2, end: Vector2) -> Array[Vector2]:
      print("Using A* calculations...")
      return [start, end] # placeholder

  class_name NavMeshStrategy extends PathfindingStrategy
  func find_path(start: Vector2, end: Vector2) -> Array[Vector2]:
      print("Using NavigationServer2D...")
      return [start, end] # placeholder

  class_name Navigator extends Node
  var _strategy: PathfindingStrategy

  func set_strategy(strat: PathfindingStrategy) -> void:
      _strategy = strat

  func route(start: Vector2, end: Vector2) -> Array[Vector2]:
      return _strategy.find_path(start, end)
tags: [godot, gdscript, strategy, algorithms, ai]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
The Strategy pattern empowers an entity with a library of tactical tomes. Instead of hardcoding complex algorithms, you dynamically inject the methodology required—be it A* pathfinding or neural-net targeting. The entity merely executes the chosen stratagem without knowing its inner workings.
