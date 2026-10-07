---
title: The Ritual Template
description: Define the skeleton of an algorithm in an operation, deferring some steps to subclasses/sub-targets.
type: makefile
gofPattern: Template Method
gofCategory: Behavioral
arcaneSchool: "Evocation // Formulaic Magic"
formula: |2
  # The Template Method (Skeleton of the ritual)
  .PHONY: perform_ritual
  perform_ritual: step_prepare step_invoke step_conclude
  	@echo "The standardized ritual is complete."
  
  # Default implementations (can be overridden by specific ritual types)
  .PHONY: step_prepare step_invoke step_conclude
  
  step_prepare:
  	@echo "Default Preparation: Clearing the mind."
  
  # step_invoke is abstract and MUST be provided by the concrete invocation
  step_invoke:
  	@if [ -z "$(INVOCATION)" ]; then \
  		echo "Error: INVOCATION not defined for the template."; exit 1; \
  	fi
  	$(MAKE) $(INVOCATION)
  
  step_conclude:
  	@echo "Default Conclusion: Banishing lingering energies."
  
  # Concrete Invocations
  .PHONY: invoke_fire invoke_water
  invoke_fire:
  	@echo "Invoking the Flames of Ignis!"
  
  invoke_water:
  	@echo "Invoking the Tides of Aqua!"
  
  # Usage: make perform_ritual INVOCATION=invoke_fire
tags: [makefile, behavioral, template-method, inheritance]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
