---
title: The Combat Strategy
description: Define a family of algorithms, encapsulate each one, and make them interchangeable at runtime.
type: makefile
gofPattern: Strategy
gofCategory: Behavioral
arcaneSchool: "Divination // Tactical Precognition"
formula: |2
  # The Strategy interface
  STRATEGY ?= stealth
  
  # Concrete Strategies
  .PHONY: strat_stealth strat_assault strat_diplomacy
  
  strat_stealth:
  	@echo "Executing Stealth Strategy: Casting invisibility and silencing footsteps."
  
  strat_assault:
  	@echo "Executing Assault Strategy: Pre-casting fireballs and summoning battle mounts."
  
  strat_diplomacy:
  	@echo "Executing Diplomacy Strategy: Casting charm person and brewing tea."
  
  # The Context
  .PHONY: execute_mission
  execute_mission: strat_$(STRATEGY)
  	@echo "Mission concluded using the $(STRATEGY) paradigm."
tags: [makefile, behavioral, strategy, tactics]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
