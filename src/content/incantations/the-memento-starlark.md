---
title: The Memento
description: Capturing and restoring immutable states within mutable phases.
type: starlark
gofPattern: Memento
gofCategory: Behavioral
arcaneSchool: "Chronomancy // State Preservation"
formula: |2
  def create_memento(state_dict):
      # Create a deep-ish copy of the dict to freeze its state
      return struct(state = dict(state_dict))
  
  def restore_memento(memento, target_dict):
      target_dict.clear()
      target_dict.update(memento.state)
  
  # Usage
  build_context = {"flags": ["-O0"], "arch": "x86"}
  
  # Save state
  saved_state = create_memento(build_context)
  
  # Mutate state during macro execution
  build_context["flags"].append("-Wall")
  build_context["arch"] = "arm64"
  
  # Restore state
  restore_memento(saved_state, build_context)
tags: [behavioral, starlark, hermetic]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

Though Starlark heavily favors immutability, dictionaries within a function's scope are mutable. When evaluating complex macros, one might need to temporarily alter a context dictionary and then roll back those changes. The **Memento** pattern securely captures the state of a dictionary into an immutable `struct` (the Memento). It can then be held safely and used to perfectly restore the past timeline, preventing state contamination across targets.
