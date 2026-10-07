---
title: "The State: Fluid Metamorphosis"
description: "Allow an object to alter its behavior when its internal state changes, appearing to change its class."
type: gdscript
gofPattern: State
gofCategory: Behavioral
arcaneSchool: "Transmutation // Metamorphosis"
formula: |2
  class_name EntityState extends RefCounted
  func enter(entity: Node) -> void: pass
  func update(entity: Node, delta: float) -> void: pass
  func exit(entity: Node) -> void: pass

  class_name IdleState extends EntityState
  func update(entity: Node, delta: float) -> void:
      # Logic for idling
      pass

  class_name StateMachine extends Node
  var current_state: EntityState
  var target: Node

  func transition_to(new_state: EntityState) -> void:
      if current_state:
          current_state.exit(target)
      current_state = new_state
      current_state.enter(target)

  func _process(delta: float) -> void:
      if current_state:
          current_state.update(target, delta)
tags: [godot, gdscript, state, fsm]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
To transcend convoluted conditional logic, the State pattern encapsulates behavior into discreet, swappable minds. As a machine transitions, the entity seamlessly shifts its reactions to input and physics, performing a fluid metamorphosis between idle calm and aggressive frenzy.
