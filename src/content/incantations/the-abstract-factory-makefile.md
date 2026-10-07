---
title: Abstract Dependency Factory
description: Conjure entire families of related mystical targets without specifying their concrete incantations.
type: makefile
gofPattern: Abstract Factory
gofCategory: Creational
arcaneSchool: "Conjuration // Dependency Summoning"
formula: |2
  # The Abstract Factory interface, defining the summoning rituals
  # We use recursive make or variable indirection to summon different families
  
  # The grimoires (families)
  FAMILY ?= light
  
  # Concrete implementations for the Light Grimoire
  light_weapon := wand
  light_armor := robe
  
  # Concrete implementations for the Dark Grimoire
  dark_weapon := staff
  dark_armor := plate
  
  # The Abstract Factory resolving the current family
  WEAPON := $($(FAMILY)_weapon)
  ARMOR := $($(FAMILY)_armor)
  
  .PHONY: summon
  summon: equip_weapon equip_armor
  	@echo "Summoning complete for family: $(FAMILY)"
  
  .PHONY: equip_weapon
  equip_weapon:
  	@echo "Equipping $(WEAPON)..."
  
  .PHONY: equip_armor
  equip_armor:
  	@echo "Donning $(ARMOR)..."
tags: [makefile, creational, abstract-factory, dependency-summoning]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
