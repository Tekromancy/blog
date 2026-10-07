---
title: The Array Iterator
description: Sequentially access elements of a mystical collection without exposing its underlying representation.
type: makefile
gofPattern: Iterator
gofCategory: Behavioral
arcaneSchool: "Divination // Chronomancy"
formula: |2
  # The Collection
  ARTIFACTS := amulet ring staff grimoire
  
  # The Iterator logic using foreach
  .PHONY: iterate
  iterate:
  	@echo "Iterating through the vault of artifacts:"
  	$(foreach item,$(ARTIFACTS),\
  		$(info Inspecting item: $(item)))
  	@echo "Iteration complete."
tags: [makefile, behavioral, iterator, looping]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
