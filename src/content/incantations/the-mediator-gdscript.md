---
title: "The Mediator: The Central Arbiter"
description: "Reduce chaotic dependencies by forcing objects to communicate through a central authority."
type: gdscript
gofPattern: Mediator
gofCategory: Behavioral
arcaneSchool: "Divination // Arbitration"
formula: |2
  class_name UIMediator extends Node

  @export var health_bar: ProgressBar
  @export var log_panel: RichTextLabel

  func notify(sender: Node, event: String, data: Variant = null) -> void:
      if event == "PlayerDamaged":
          health_bar.value -= data as int
          log_panel.append_text("\nPlayer took %d damage!" % data)
      elif event == "PlayerHealed":
          health_bar.value += data as int
          log_panel.append_text("\nPlayer healed for %d." % data)
tags: [godot, gdscript, mediator, UI]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
In the tangled web of a user interface, direct connections breed chaos. The Mediator stands as the Central Arbiter—a hub of coordination. Components broadcast their shifts in state to the Mediator, which alone possesses the arcane knowledge of how the rest of the system must react.
