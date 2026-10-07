---
title: "The Composite: The Fractal Tree"
description: "Treat individual nodes and compositions of nodes uniformly through Godot's built-in scene graph."
type: gdscript
gofPattern: Composite
gofCategory: Structural
arcaneSchool: "Transmutation // Structuring"
formula: |2
  class_name GameComponent extends Node

  func execute_logic() -> void:
      push_error("Abstract execute_logic")

  # Leaf Node
  class_name TerminalNode extends GameComponent
  func execute_logic() -> void:
      print("Hacking the mainframe: ", self.name)

  # Composite Node
  class_name ComponentGroup extends GameComponent
  func execute_logic() -> void:
      print("Executing group: ", self.name)
      for child in get_children():
          if child is GameComponent:
              child.execute_logic()
tags: [godot, gdscript, composite, nodes]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
Godot's Scene Tree is inherently a Composite pattern. However, explicitly defining shared interfaces allows your arcane systems to broadcast commands across a fractal hierarchy of nodes. Whether commanding a single combat drone or an entire swarm fleet, the invocation remains identical.
