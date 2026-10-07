---
title: The Mediator
description: Centralizing communication between decoupled build extensions.
type: starlark
gofPattern: Mediator
gofCategory: Behavioral
arcaneSchool: "Enchantment // Orchestration"
formula: |2
  def create_build_mediator():
      registry = {"components": {}}
      
      def _register(name, component):
          registry["components"][name] = component
          
      def _notify(sender_name, event_type, payload):
          print("Mediator routing event %s from %s..." % (event_type, sender_name))
          # In a real scenario, this would orchestrate data passing
          if event_type == "TARGET_GENERATED":
              if "linker" in registry["components"]:
                  return registry["components"]["linker"].on_target(payload)
          return None
          
      return struct(
          register = _register,
          notify = _notify
      )
  
  # Usage
  mediator = create_build_mediator()
  # Mock components would be registered here, and they would hold a reference 
  # to the mediator to send events without knowing about each other.
tags: [behavioral, starlark, hermetic]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

When constructing massively modular macro systems, inter-dependencies between modules can create unmanageable spaghetti code. The **Mediator** pattern centralizes the communication. Instead of the `compiler_module` directly calling the `linker_module`, both interact strictly with the Mediator struct. This enforces a hermetic boundary between sub-systems, making the build ecosystem infinitely more extensible.
