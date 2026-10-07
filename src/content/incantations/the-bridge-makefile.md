---
title: The Astral Bridge
description: Decouple an arcane abstraction from its implementation, allowing both to vary independently.
type: makefile
gofPattern: Bridge
gofCategory: Structural
arcaneSchool: "Conjuration // Planar Bridging"
formula: |2
  # The Abstraction: Spell Casting Interface
  # The Implementation: Magical Elements (Fire, Void)
  
  # Target Implementations
  .PHONY: impl_fire impl_void
  impl_fire:
  	@echo "Channeling volatile thermal energy..."
  
  impl_void:
  	@echo "Siphoning entropy from the abyss..."
  
  # The Abstraction uses a variable to bridge to the implementation
  ELEMENT ?= fire
  
  .PHONY: cast_blast cast_shield
  
  cast_blast: impl_$(ELEMENT)
  	@echo "Releasing a blast of $(ELEMENT)!"
  
  cast_shield: impl_$(ELEMENT)
  	@echo "Weaving a defensive ward of $(ELEMENT)!"
tags: [makefile, structural, bridge, elements]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
