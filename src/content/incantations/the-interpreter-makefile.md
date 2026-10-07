---
title: The Arcane Interpreter
description: Define a grammatical representation for a language and an interpreter to evaluate it within Make.
type: makefile
gofPattern: Interpreter
gofCategory: Behavioral
arcaneSchool: "Divination // Linguistics"
formula: |2
  # A rudimentary interpreter for an arcane script
  # Syntax: SCRIPT="SUMMON demon BIND circle BANISH"
  
  SCRIPT ?= "SUMMON demon BIND circle"
  
  # Map keywords to make targets
  .PHONY: eval SUMMON BIND BANISH demon circle
  
  demon:
  	@echo "[Target: Demon]"
  
  circle:
  	@echo "[Location: Binding Circle]"
  
  SUMMON:
  	@echo "Interpreting SUMMON..."
  
  BIND:
  	@echo "Interpreting BIND..."
  
  BANISH:
  	@echo "Interpreting BANISH..."
  
  # The interpreter loop using Make's filter/foreach
  eval:
  	@echo "Evaluating Script: $(SCRIPT)"
  	@for token in $(SCRIPT); do \
  		$(MAKE) --no-print-directory $$token; \
  	done
tags: [makefile, behavioral, interpreter, parsing]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---
