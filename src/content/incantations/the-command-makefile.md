---
title: The Encapsulated Command
description: Turn a request into a stand-alone executable target, parameterizing clients with different requests.
type: makefile
gofPattern: Command
gofCategory: Behavioral
arcaneSchool: "Enchantment // Scroll Scribing"
formula: |2
  # The Receiver
  .PHONY: _db_migrate _db_rollback
  _db_migrate:
  	@echo "Applying chronomantic shifts to the database schema..."
  _db_rollback:
  	@echo "Reversing the flow of time on the database..."
  
  # The Commands (Encapsulating the Receiver and Parameters)
  .PHONY: cmd_migrate cmd_rollback
  cmd_migrate: _db_migrate
  cmd_rollback: _db_rollback
  
  # The Invoker
  # make execute CMD=cmd_migrate
  CMD ?= cmd_migrate
  
  .PHONY: execute
  execute:
  	@echo "Executing command scroll: $(CMD)"
  	@$(MAKE) --no-print-directory $(CMD)
tags: [makefile, behavioral, command, execution]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
