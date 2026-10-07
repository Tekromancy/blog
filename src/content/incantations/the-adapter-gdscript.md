---
title: "The Adapter: Arcane Interface Converter"
description: "Bridge incompatible interfaces, allowing legacy scripts and alien node structures to commune."
type: gdscript
gofPattern: Adapter
gofCategory: Structural
arcaneSchool: "Transmutation // Interface"
formula: |2
  # Target Interface
  class_name IWeapon extends RefCounted
  func fire_weapon() -> void: pass

  # Adaptee (Incompatible)
  class_name AlienBlaster extends Node
  func execute_plasma_discharge() -> void:
      print("Plasma discharge initialized!")

  # The Adapter
  class_name AlienBlasterAdapter extends IWeapon
  var _blaster: AlienBlaster

  func _init(blaster: AlienBlaster) -> void:
      _blaster = blaster

  func fire_weapon() -> void:
      _blaster.execute_plasma_discharge()
tags: [godot, gdscript, adapter, bridging]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
When ancient, incompatible scripts collide with your modern game architecture, the Adapter serves as a translational glyph. It wraps the alien node, presenting a familiar interface to your systems and transmuting your standard calls into the esoteric commands required by the legacy component.
