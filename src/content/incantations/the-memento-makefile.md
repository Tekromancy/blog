---
title: The Temporal Memento
description: Capture and externalize an internal state so it can be restored later without violating encapsulation.
type: makefile
gofPattern: Memento
gofCategory: Behavioral
arcaneSchool: "Chronomancy // State Preservation"
formula: |2
  # The Originator state file
  STATE_FILE := .magic_state
  BACKUP_FILE := .magic_state.bak
  
  .PHONY: init_state save_memento restore_memento read_state
  
  init_state:
  	@echo "CURRENT_TIER=5" > $(STATE_FILE)
  	@echo "State initialized."
  
  save_memento:
  	@cp $(STATE_FILE) $(BACKUP_FILE)
  	@echo "Memento saved. Time strand preserved."
  
  restore_memento:
  	@cp $(BACKUP_FILE) $(STATE_FILE)
  	@echo "Memento restored. Time reversed to saved strand."
  
  read_state:
  	@echo "Current state:"
  	@cat $(STATE_FILE)
  
  .PHONY: clean
  clean:
  	@rm -f $(STATE_FILE) $(BACKUP_FILE)
tags: [makefile, behavioral, memento, time-travel]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
