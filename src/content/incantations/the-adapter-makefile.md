---
title: The Interface Adapter
description: Translate the incantations of an ancient grimoire into the modern dependency syntax.
type: makefile
gofPattern: Adapter
gofCategory: Structural
arcaneSchool: "Transmutation // Interface Shifting"
formula: |2
  # The Adaptee: an ancient shell script or legacy make target with an incompatible interface
  .PHONY: legacy_summon
  legacy_summon:
  	@echo "[Legacy] SUmmon1NG 0ld G0D... requires ARG1 and ARG2 environment vars."
  
  # The Target Interface: what the modern Cyber-Mage expects
  # make modern_summon ENTITY=cthulhu
  
  # The Adapter: translates the modern parameters into the legacy invocation
  .PHONY: modern_summon
  modern_summon:
  	@if [ -z "$(ENTITY)" ]; then echo "Missing ENTITY parameter"; exit 1; fi
  	@echo "[Adapter] Translating modern request for $(ENTITY)..."
  	$(MAKE) legacy_summon ARG1=$(ENTITY) ARG2=modern_binding
tags: [makefile, structural, adapter, legacy-binding]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
