---
title: The Astral Observer
description: Define a one-to-many dependency so that when one target changes state, all its dependents are notified and updated.
type: makefile
gofPattern: Observer
gofCategory: Behavioral
arcaneSchool: "Divination // Telepathy"
formula: |2
  # The Subject (The observable event)
  # In Make, files act as subjects, and dependent targets act as observers.
  
  SUBJECT_FILE := nexus.sigil
  
  $(SUBJECT_FILE):
  	@echo "Drawing the Nexus Sigil..."
  	@touch $@
  
  # The Observers (Targets that react to the subject's modification)
  .PHONY: observer_ward observer_golem
  
  observer_ward: $(SUBJECT_FILE)
  	@echo "[Observer 1] The Ward detects changes in the Nexus Sigil. Re-calibrating defenses..."
  
  observer_golem: $(SUBJECT_FILE)
  	@echo "[Observer 2] The Golem detects changes in the Nexus Sigil. Re-awakening..."
  
  # Trigger the event
  .PHONY: trigger_event
  trigger_event: observer_ward observer_golem
  	@echo "All observers notified."
  
  .PHONY: clean
  clean:
  	@rm -f $(SUBJECT_FILE)
tags: [makefile, behavioral, observer, events]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
