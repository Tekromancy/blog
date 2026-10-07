---
title: The Astral Visitor
description: Represent an operation to be performed on the elements of an object structure without changing the classes on which it operates.
type: makefile
gofPattern: Visitor
gofCategory: Behavioral
arcaneSchool: "Conjuration // Entity Projection"
formula: |2
  # Elements in the structure
  ELEMENTS := node_alpha node_beta node_gamma
  
  # The Visitor operations
  .PHONY: visitor_audit visitor_bless
  
  visitor_audit:
  	@echo "The Inquisitor is auditing $(TARGET_NODE)..."
  
  visitor_bless:
  	@echo "The Priest is blessing $(TARGET_NODE)..."
  
  # Apply a Visitor to the Elements
  VISITOR ?= visitor_audit
  
  .PHONY: accept
  accept:
  	@for node in $(ELEMENTS); do \
  		$(MAKE) --no-print-directory $(VISITOR) TARGET_NODE=$$node; \
  	done
tags: [makefile, behavioral, visitor, traversal]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
