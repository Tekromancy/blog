---
title: The Resolution Chain
description: Pass a request along a chain of magical handlers until one successfully processes it.
type: makefile
gofPattern: Chain of Responsibility
gofCategory: Behavioral
arcaneSchool: "Divination // Leyline Routing"
formula: |2
  # The Request
  SPELL_TIER ?= 1
  
  # The Handlers in the chain
  .PHONY: handle_tier_1 handle_tier_2 handle_tier_3 fallback
  
  handle_tier_1:
  	@if [ "$(SPELL_TIER)" -eq 1 ]; then echo "Apprentice handled the tier 1 spell."; else $(MAKE) --no-print-directory handle_tier_2; fi
  
  handle_tier_2:
  	@if [ "$(SPELL_TIER)" -eq 2 ]; then echo "Adept handled the tier 2 spell."; else $(MAKE) --no-print-directory handle_tier_3; fi
  
  handle_tier_3:
  	@if [ "$(SPELL_TIER)" -eq 3 ]; then echo "Archmage handled the tier 3 spell."; else $(MAKE) --no-print-directory fallback; fi
  
  fallback:
  	@echo "The spell fizzled. No mage could handle a tier $(SPELL_TIER) request."
  
  # Entry point
  .PHONY: process_spell
  process_spell: handle_tier_1
tags: [makefile, behavioral, chain-of-responsibility, routing]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
