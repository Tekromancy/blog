---
title: The Builder
description: Incrementally weaving complex artifacts in a sealed environment.
type: starlark
gofPattern: Builder
gofCategory: Creational
arcaneSchool: "Transmutation // Synthesis"
formula: |2
  def target_builder():
      state = {"name": "", "deps": [], "srcs": []}
      
      def _set_name(name):
          state["name"] = name
          return builder_proxy
          
      def _add_dep(dep):
          state["deps"].append(dep)
          return builder_proxy
          
      def _add_src(src):
          state["srcs"].append(src)
          return builder_proxy
          
      def _build():
          if not state["name"]:
              fail("Artifact name is required")
          return struct(name=state["name"], deps=list(state["deps"]), srcs=list(state["srcs"]))
          
      builder_proxy = struct(
          set_name = _set_name,
          add_dep = _add_dep,
          add_src = _add_src,
          build = _build
      )
      return builder_proxy
  
  # Usage
  my_target = target_builder().set_name("hermetic_core").add_src("core.cc").add_dep(":utils").build()
tags: [creational, builder, starlark]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

Starlark forbids direct mutation of outer-scope variables unless they are mutable collections like dictionaries or lists. The **Builder** pattern thrives on this quirk, using a mutable state dictionary enclosed within a closure to sequentially gather ingredients for a build charm. Once the incantation is fully specified, the `_build()` method seals the state into an immutable `struct`, ensuring that the resulting artifact cannot be tampered with by rogue macro scripts.
