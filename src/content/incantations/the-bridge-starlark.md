---
title: The Bridge
description: Decoupling a build abstraction from its hermetic implementation.
type: starlark
gofPattern: Bridge
gofCategory: Structural
arcaneSchool: "Enchantment // Weaving"
formula: |2
  # Implementation Hierarchies
  def linux_os_impl():
      return struct(execute=lambda cmd: "Linux bash: " + cmd)
  
  def cyber_os_impl():
      return struct(execute=lambda cmd: "CyberOS neural link: " + cmd)
  
  # Abstraction Hierarchy
  def remote_execution_bridge(os_impl):
      def _run_task(task_name):
          log = os_impl.execute("start " + task_name)
          return "Task [%s] executed via %s" % (task_name, log)
      return struct(run_task=_run_task)
  
  # Usage
  linux_bridge = remote_execution_bridge(linux_os_impl())
  print(linux_bridge.run_task("compile_core"))
tags: [structural, starlark, hermetic]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

In the vast realms of polyglot monorepos, you often find your execution environments (the Implementation) scaling independently from your build tasks (the Abstraction). The **Bridge** pattern elegantly binds a struct defining high-level workflow orchestrations to another struct that contains the gritty, OS-level execution primitives. In Starlark, this prevents a combinatorial explosion of `.bzl` rules when multiplying cross-compilation targets with execution platforms.
