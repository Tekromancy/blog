---
title: The Chain of Responsibility
description: Passing build tasks through a sequence of hermetic validators.
type: starlark
gofPattern: Chain of Responsibility
gofCategory: Behavioral
arcaneSchool: "Divination // Filtering"
formula: |2
  def create_filter(rule_name, handler_func, next_filter=None):
      def _handle(target):
          if target.get("type") == rule_name:
              return handler_func(target)
          elif next_filter:
              return next_filter.handle(target)
          return "Unhandled target type: " + target.get("type", "unknown")
          
      return struct(handle=_handle)
  
  def handle_cc(target): return "Compiling C++ target: " + target["name"]
  def handle_py(target): return "Packaging Python target: " + target["name"]
  
  # Usage: Chain the handlers
  py_filter = create_filter("python", handle_py)
  cc_filter = create_filter("cc", handle_cc, next_filter=py_filter)
  
  result = cc_filter.handle({"name": "app", "type": "python"})
tags: [behavioral, starlark, hermetic]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

When a raw build target is ingested by a massive macro, it must often be analyzed to determine how it should be processed. The **Chain of Responsibility** allows you to decouple the routing logic from the execution logic. By chaining struct "filters", the target passes through a gauntlet of divination wards; each ward either consumes and processes the target based on its metadata, or defers it to the next ward in the chain.
