---
title: The Singular Nexus
description: Ensure only one instance of a global magical state exists across the build graph.
type: makefile
gofPattern: Singleton
gofCategory: Creational
arcaneSchool: "Abjuration // State Binding"
formula: |2
  # A Singleton in Make is often represented by a unique, one-time generated file or evaluated variable.
  # We use the $(eval ...) function and a check to ensure it's only computed once.
  
  ifndef NEXUS_CORE
  $(info [Singleton] Initializing the Nexus Core...)
  # Costly arcane computation
  NEXUS_CORE := $(shell date +%N)
  export NEXUS_CORE
  endif
  
  .PHONY: invoke_a invoke_b
  
  invoke_a:
  	@echo "Invocation A draws upon Nexus: $(NEXUS_CORE)"
  
  invoke_b:
  	@echo "Invocation B draws upon Nexus: $(NEXUS_CORE)"
  
  .PHONY: all
  all: invoke_a invoke_b
tags: [makefile, creational, singleton, nexus]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
