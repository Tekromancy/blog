---
title: The Aether Flyweight
description: Share vast amounts of magical state efficiently through common prerequisite files.
type: makefile
gofPattern: Flyweight
gofCategory: Structural
arcaneSchool: "Abjuration // Memory Warding"
formula: |2
  # The Flyweight intrinsic state (Shared artifact)
  FLYWEIGHT_CORE = .flyweight.core
  
  $(FLYWEIGHT_CORE):
  	@echo "Forging the shared Aether Core..."
  	@echo "HEAVY_MAGICAL_DATA" > $@
  
  # Extrinsic state is passed or unique to the targets
  .PHONY: construct_golem_a construct_golem_b
  
  # Both targets depend on the exact same heavy core file to save temporal space
  construct_golem_a: $(FLYWEIGHT_CORE)
  	@echo "Animating Golem A with core data: $$(cat $(FLYWEIGHT_CORE))"
  	@echo "Golem A uses extrinsic material: Clay"
  
  construct_golem_b: $(FLYWEIGHT_CORE)
  	@echo "Animating Golem B with core data: $$(cat $(FLYWEIGHT_CORE))"
  	@echo "Golem B uses extrinsic material: Iron"
  
  clean:
  	@rm -f $(FLYWEIGHT_CORE)
tags: [makefile, structural, flyweight, optimization]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
