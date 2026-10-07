---
title: "The Visitor: The Astral Traveler"
description: "Represent an operation to be performed on the elements of an object structure without changing their classes."
type: gdscript
gofPattern: Visitor
gofCategory: Behavioral
arcaneSchool: "Divination // Traversal"
formula: |2
  class_name IVisitor extends RefCounted
  func visit_ally(ally: Node) -> void: pass
  func visit_enemy(enemy: Node) -> void: pass

  class_name DamageVisitor extends IVisitor
  func visit_ally(ally: Node) -> void:
      print("Healing ally for 10 HP.")
  func visit_enemy(enemy: Node) -> void:
      print("Damaging enemy for 50 HP.")

  class_name GameEntity extends Node
  func accept(visitor: IVisitor) -> void: pass

  class_name AllyNode extends GameEntity
  func accept(visitor: IVisitor) -> void:
      visitor.visit_ally(self)

  class_name EnemyNode extends GameEntity
  func accept(visitor: IVisitor) -> void:
      visitor.visit_enemy(self)
tags: [godot, gdscript, visitor, double-dispatch]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---
When a hierarchy of entities is vast and immutable, adding new behaviors directly to them risks corrupting the core. The Visitor pattern acts as an Astral Traveler, stepping through the object structure and executing logic specific to each class it encounters, cleanly separating the operation from the host entities.
