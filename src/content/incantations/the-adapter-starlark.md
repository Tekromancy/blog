---
title: The Adapter
description: Translating ancient arcane interfaces into modern build syntax.
type: starlark
gofPattern: Adapter
gofCategory: Structural
arcaneSchool: "Transmutation // Interface Shifting"
formula: |2
  # The old API expects specific legacy naming
  def _legacy_compiler():
      return struct(
          compile_src = lambda src: "Compiling %s with ancient magic" % src,
          link_objs = lambda objs: "Linking %s in the dark" % objs
      )
  
  # The new hermetic API expects 'build' and 'package'
  def make_compiler_adapter(legacy_impl):
      def _build(source_file):
          return legacy_impl.compile_src(source_file)
          
      def _package(object_files):
          return legacy_impl.link_objs(object_files)
          
      return struct(
          build = _build,
          package = _package
      )
  
  # Usage
  modern_compiler = make_compiler_adapter(_legacy_compiler())
tags: [structural, starlark, hermetic]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

As build systems evolve from chaotic, shell-script-driven rituals to orderly Starlark incantations, legacy macro interfaces must often be supported to prevent the collapse of existing repositories. The **Adapter** pattern wraps these ancient forms, shifting their inputs and translating their outputs so they seamlessly plug into modern, type-checked (or at least strictly structured) rule implementations.
