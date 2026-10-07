---
title: The Template Method
description: Outlining the skeleton of a build ritual with deferred hooks.
type: starlark
gofPattern: Template Method
gofCategory: Behavioral
arcaneSchool: "Conjuration // Ritual Skeletons"
formula: |2
  def execute_build_ritual(hooks_struct):
      results = []
      
      # Hook 1
      if hasattr(hooks_struct, "pre_build"):
          results.append(hooks_struct.pre_build())
          
      # Core inflexible ritual
      results.append("Forging core binary...")
      
      # Hook 2
      if hasattr(hooks_struct, "post_build"):
          results.append(hooks_struct.post_build())
          
      return results
  
  def python_hooks():
      return struct(
          pre_build = lambda: "Linting Python files",
          post_build = lambda: "Bundling into ZIP"
      )
      
  # Usage
  process = execute_build_ritual(python_hooks())
tags: [behavioral, starlark, hermetic]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

When standardizing build pipelines across an entire organization, consistency is critical. The **Template Method** defines the unbreakable skeleton of the build ritual within a core Starlark function. However, it leaves specific semantic gaps—hooks—that can be fulfilled by passing in a structurally typed `struct`. This enforces the corporate standard while allowing language-specific mages to inject their own pre- and post-processing steps.
