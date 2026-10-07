---
title: Echo Prototype
description: Clone existing spell configurations rather than reciting them from scratch.
type: makefile
gofPattern: Prototype
gofCategory: Creational
arcaneSchool: "Illusion // Cloning"
formula: |2
  # The Prototype base configuration
  BASE_SPELL_POWER := 100
  BASE_SPELL_ASPECT := Neutral
  
  # Clone 1: The Fireball (mutating the prototype)
  fireball_POWER := $(shell echo $$(($(BASE_SPELL_POWER) * 2)))
  fireball_ASPECT := Fire
  
  # Clone 2: The Frost Nova (mutating the prototype)
  frost_nova_POWER := $(shell echo $$(($(BASE_SPELL_POWER) / 2)))
  frost_nova_ASPECT := Frost
  
  .PHONY: cast_%
  cast_%:
  	@echo "Casting $*!"
  	@echo "Power: $($*_POWER)"
  	@echo "Aspect: $($*_ASPECT)"
tags: [makefile, creational, prototype, variables]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
