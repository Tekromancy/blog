---
title: The Spell Decorator
description: Dynamically attach additional magical properties to an existing make target.
type: makefile
gofPattern: Decorator
gofCategory: Structural
arcaneSchool: "Transmutation // Meta-Weaving"
formula: |2
  # The core component
  .PHONY: base_spell
  base_spell:
  	@echo "Casting basic magic missile."
  
  # Decorator 1: Empower
  .PHONY: empower
  empower:
  	@echo "Applying Empower metamagic (+50% damage)..."
  
  # Decorator 2: Maximize
  .PHONY: maximize
  maximize:
  	@echo "Applying Maximize metamagic (max variables)..."
  
  # We construct the decorated spell by chaining prerequisites
  # E.g., make cast_decorated DECORATORS="empower maximize"
  DECORATORS ?=
  
  .PHONY: cast_decorated
  cast_decorated: $(DECORATORS) base_spell
  	@echo "Decorated spell sequence complete."
tags: [makefile, structural, decorator, metamagic]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
