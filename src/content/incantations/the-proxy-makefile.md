---
title: The Ward Proxy
description: Control access to an expensive or dangerous invocation via an intermediary target.
type: makefile
gofPattern: Proxy
gofCategory: Structural
arcaneSchool: "Abjuration // Access Wards"
formula: |2
  # The Real Subject (Expensive/Dangerous Target)
  .PHONY: _summon_elder_god
  _summon_elder_god:
  	@echo "WARNING: Tearing the fabric of reality..."
  	@echo "The Elder God has arrived."
  
  # The Proxy (Access Control)
  # Checks if the mage has the required clearance (e.g., variable set)
  AUTHORIZED ?= false
  
  .PHONY: summon_elder_god
  summon_elder_god:
  	@if [ "$(AUTHORIZED)" != "true" ]; then \
  		echo "Access Denied: You lack the requisite warding seals to summon an Elder God."; \
  		exit 1; \
  	else \
  		$(MAKE) _summon_elder_god; \
  	fi
tags: [makefile, structural, proxy, warding]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
