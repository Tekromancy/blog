---
title: "The Builder: Artificer's Assembly"
description: "Construct complex Godot nodes step by step, binding arcane scripts and sub-nodes with precision."
type: gdscript
gofPattern: Builder
gofCategory: Creational
arcaneSchool: "Conjuration // Artifice"
formula: |2
  class_name GolemBuilder extends RefCounted

  var _golem: CharacterBody3D

  func _init():
      reset()

  func reset() -> void:
      _golem = CharacterBody3D.new()

  func add_mesh(mesh_type: Mesh) -> GolemBuilder:
      var mesh_instance = MeshInstance3D.new()
      mesh_instance.mesh = mesh_type
      _golem.add_child(mesh_instance)
      return self

  func add_collider(shape: Shape3D) -> GolemBuilder:
      var collider = CollisionShape3D.new()
      collider.shape = shape
      _golem.add_child(collider)
      return self

  func awaken() -> CharacterBody3D:
      var result = _golem
      reset()
      return result
tags: [godot, gdscript, building, assembly]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
When a simple instantiation is not enough to breathe life into a complex entity, the Builder paradigm allows the artificer to craft the vessel piece by piece. In the engine, this pattern gracefully chains the attachment of colliders, meshes, and enchanted scripts before finalizing the construct.
