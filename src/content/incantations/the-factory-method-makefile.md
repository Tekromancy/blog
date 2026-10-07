---
title: Summoning Method
description: Defer the exact instantiation of a target to its sub-makefiles or pattern rules.
type: makefile
gofPattern: Factory Method
gofCategory: Creational
arcaneSchool: "Conjuration // Metamagic"
formula: |2
  # The Factory Method pattern implemented via Pattern Rules
  
  # The Creator interface requests a product
  .PHONY: spawn_demon spawn_angel
  spawn_demon: entity-demon
  spawn_angel: entity-angel
  
  # The Factory Method itself: a pattern rule that dynamically instantiates
  # based on the requested stem (%)
  entity-%:
  	@echo "Drawing the summoning circle for a $*..."
  	@echo "Binding $* to the material plane."
  	@touch $@
  
  .PHONY: clean
  clean:
  	@rm -f entity-*
tags: [makefile, creational, factory-method, pattern-rules]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
