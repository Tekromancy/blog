---
title: The Composite
description: Treating individual rules and rule collections uniformly.
type: starlark
gofPattern: Composite
gofCategory: Structural
arcaneSchool: "Conjuration // Swarm Intelligence"
formula: |2
  def build_target_leaf(name, output):
      return struct(
          name = name,
          evaluate = lambda: ["Built leaf: %s -> %s" % (name, output)]
      )
  
  def build_target_group(name, children):
      def _evaluate():
          results = ["Group started: " + name]
          for child in children:
              results.extend(child.evaluate())
          results.append("Group finished: " + name)
          return results
          
      return struct(
          name = name,
          evaluate = _evaluate
      )
  
  # Usage
  t1 = build_target_leaf("lib_a", "a.o")
  t2 = build_target_leaf("lib_b", "b.o")
  group = build_target_group("all_libs", [t1, t2])
tags: [structural, starlark, hermetic]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

Build graphs are inherently tree structures. Starlark’s manipulation of dependency chains is practically a masterclass in the **Composite** pattern. By defining both simple leaf artifacts (individual files or compilation units) and complex composite artifacts (filegroups, suites) with the exact same interface (`evaluate()` or similar providers), macros can traverse arbitrarily deep hierarchies without needing to type-check whether they are operating on a single file or a thousand.
