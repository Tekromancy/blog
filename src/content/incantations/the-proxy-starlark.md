---
title: The Proxy
description: Deferring expensive rule evaluations via intermediary structs.
type: starlark
gofPattern: Proxy
gofCategory: Structural
arcaneSchool: "Illusion // Deferment"
formula: |2
  def expensive_target_provider():
      print("Performing heavy target evaluation...")
      return struct(execute=lambda: "Heavy target executed")
  
  def lazy_target_proxy(provider_func):
      state = {"instance": None}
      
      def _get_instance():
          if not state["instance"]:
              state["instance"] = provider_func()
          return state["instance"]
          
      def _execute():
          return _get_instance().execute()
          
      return struct(
          is_proxy = True,
          execute = _execute
      )
  
  # Usage
  # The heavy evaluation does not run yet.
  proxy = lazy_target_proxy(expensive_target_provider)
  # Only upon execution is the underlying artifact conjured.
  result = proxy.execute()
tags: [structural, starlark, hermetic]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

Sometimes loading a macro requires querying an external repository or evaluating a deep dependency graph. The **Proxy** pattern in Starlark shields the build loading phase from these expensive operations by acting as a placeholder. It defers the actual execution (or instantiation) of the target until the precise moment it is required. This lazy-loading technique speeds up the parsing phase, crucial for massive hermetic workspaces.
