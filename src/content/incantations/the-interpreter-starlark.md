---
title: The Interpreter
description: Parsing and evaluating arcane domain-specific expressions within macros.
type: starlark
gofPattern: Interpreter
gofCategory: Behavioral
arcaneSchool: "Divination // Deciphering"
formula: |2
  # Simple expression interpreter for macro DSLs
  def evaluate_build_expr(expr, context):
      if type(expr) == "list":
          return [evaluate_build_expr(e, context) for e in expr]
      elif type(expr) == "string":
          if expr.startswith("$"):
              var_name = expr[1:]
              if var_name in context:
                  return context[var_name]
              fail("Undefined variable in context: " + var_name)
          return expr
      return expr
  
  # Usage
  env = {"ARCH": "x86_64", "OS": "linux"}
  raw_dsl = ["$OS", "binary_for_$ARCH", ["nested", "$ARCH"]]
  
  resolved = evaluate_build_expr(raw_dsl, env)
  # resolved == ["linux", "binary_for_$ARCH", ["nested", "x86_64"]]
  # Note: string interpolation logic can be made more robust
tags: [behavioral, starlark, hermetic]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---

As Starlark is often used to wrap other domain-specific languages or simplify complex configuration files, the **Interpreter** pattern frequently manifests as AST evaluators written entirely in Starlark. Mages can define rules that take proprietary string syntaxes or nested list geometries and interpret them contextually using a provided environment dict, converting arcane DSLs into strict hermetic build graphs.
