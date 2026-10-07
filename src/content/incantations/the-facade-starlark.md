---
title: The Facade
description: Providing a unified gateway to complex build sub-systems.
type: starlark
gofPattern: Facade
gofCategory: Structural
arcaneSchool: "Illusion // Simplification"
formula: |2
  # Complex, granular sub-systems
  def _resource_allocator():
      return struct(reserve = lambda cores: "Reserved %s cores" % cores)
      
  def _compiler_toolchain():
      return struct(compile = lambda src: "%s.o" % src)
      
  def _linker_toolchain():
      return struct(link = lambda objs: "binary_executable")
  
  # The Facade
  def simple_build_facade():
      alloc = _resource_allocator()
      comp = _compiler_toolchain()
      link = _linker_toolchain()
      
      def _build_project(srcs):
          alloc.reserve(4)
          objs = [comp.compile(s) for s in srcs]
          return link.link(objs)
          
      return struct(build = _build_project)
  
  # Usage
  system = simple_build_facade()
  output = system.build(["main.c", "util.c"])
tags: [structural, starlark, hermetic]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

When crafting `.bzl` extensions, exposing every intricate toolchain setting, resource allocator, and linking flag can overwhelm an apprentice. The **Facade** pattern masks the chaotic inner workings of a rule under a single, unified interface. Instead of invoking a dozen different macros, the end-user simply calls the facade, which intelligently orchestrates the underlying subsystems while maintaining hermetic integrity.
