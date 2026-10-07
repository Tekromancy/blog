---
title: The Iterator
description: Traversing immutable graphs without exposing internal state.
type: starlark
gofPattern: Iterator
gofCategory: Behavioral
arcaneSchool: "Divination // Pathfinding"
formula: |2
  def create_target_iterator(targets):
      # Encapsulate state in a dictionary to allow mutation
      state = {"index": 0, "collection": targets}
      
      def _has_next():
          return state["index"] < len(state["collection"])
          
      def _next():
          if not _has_next():
              fail("Iterator exhausted")
          val = state["collection"][state["index"]]
          state["index"] += 1
          return val
          
      return struct(
          has_next = _has_next,
          next = _next
      )
  
  # Usage
  iterator = create_target_iterator(["target_A", "target_B", "target_C"])
  results = []
  # Though 'for x in y' is preferred in Starlark, stateful iteration is 
  # sometimes needed when stepping through graphs dynamically
  # while iterator.has_next():
  #     results.append(iterator.next())
tags: [behavioral, starlark, hermetic]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

While native Starlark `for` loops are the preferred path for list traversal, complex build graphs often require deferred, step-by-step traversal. The **Iterator** pattern allows an Archmage to encapsulate a collection and a cursor. By exposing only `has_next()` and `next()` through a `struct`, the internal representation of the dependencies remains safely hidden, preserving encapsulation in deeply nested rule macros.
