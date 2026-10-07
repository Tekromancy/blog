---
title: The Phase State
description: Allow an arcane object to alter its behavior when its internal state changes. The object will appear to change its class.
type: makefile
gofPattern: State
gofCategory: Behavioral
arcaneSchool: "Transmutation // Phase Shifting"
formula: |2
  # The State variable determines behavior
  PHASE ?= solid
  
  # State Handlers
  .PHONY: behavior_solid behavior_liquid behavior_gas
  
  behavior_solid:
  	@echo "The element is rock hard. It defends against physical attacks."
  
  behavior_liquid:
  	@echo "The element flows. It slips through cracks and evades capture."
  
  behavior_gas:
  	@echo "The element is ethereal. It poisons the air."
  
  # The Context Target
  .PHONY: act
  act: behavior_$(PHASE)
  	@echo "Action resolved in $(PHASE) phase."
tags: [makefile, behavioral, state, phase-shift]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
