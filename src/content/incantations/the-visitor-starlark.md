---
title: The Visitor
description: Traversing diverse targets and applying external operations.
type: starlark
gofPattern: Visitor
gofCategory: Behavioral
arcaneSchool: "Divination // Inspection"
formula: |2
  def create_cc_target(name):
      return struct(type = "cc", name = name)
      
  def create_py_target(name):
      return struct(type = "py", name = name)
      
  def target_analyzer_visitor():
      state = {"cc_count": 0, "py_count": 0}
      
      def _visit_cc(target):
          state["cc_count"] += 1
          
      def _visit_py(target):
          state["py_count"] += 1
          
      return struct(
          visit_cc = _visit_cc,
          visit_py = _visit_py,
          report = lambda: "C++ targets: %d, Python targets: %d" % (state["cc_count"], state["py_count"])
      )
  
  def apply_visitor(targets, visitor):
      for t in targets:
          if t.type == "cc":
              visitor.visit_cc(t)
          elif t.type == "py":
              visitor.visit_py(t)
          else:
              fail("Unknown target type")
  
  # Usage
  graph = [create_cc_target("engine"), create_py_target("script")]
  analyzer = target_analyzer_visitor()
  apply_visitor(graph, analyzer)
tags: [behavioral, starlark, hermetic]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---

In complex workspaces, targets are composed of highly varied structs representing different languages and rule types. The **Visitor** pattern abstracts operations out of the target definitions themselves. Instead of adding a `count()` or `lint()` method to every target struct, you create a dedicated Visitor struct. An evaluation loop passes each target to the appropriate method on the Visitor based on the target's type, enabling the creation of powerful analyzers and reporters without polluting the underlying build data.
