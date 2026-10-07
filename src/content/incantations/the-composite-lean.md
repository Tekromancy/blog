---
title: "The Composite"
description: "Composing absolute wards into recursive tree structures representing complex topological defenses."
type: lean
gofPattern: Composite
gofCategory: Structural
arcaneSchool: "Illusion // Topology"
formula: |2
  namespace MathematicalWards

  inductive TopologicalWard where
    | leaf : String → TopologicalWard
    | node : List TopologicalWard → TopologicalWard

  def TopologicalWard.evaluate : TopologicalWard → Nat
    | leaf _ => 1
    | node children => children.foldl (fun acc c => acc + c.evaluate) 0

  def myCompositeWard : TopologicalWard :=
    TopologicalWard.node [
      TopologicalWard.leaf "Alpha",
      TopologicalWard.node [
        TopologicalWard.leaf "Beta",
        TopologicalWard.leaf "Gamma"
      ]
    ]

  end MathematicalWards
tags: [structural, lean4, composite, wards]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
Using inductive types in Lean 4, the Composite pattern natively models trees of magical components, allowing recursive evaluation of ward strength.
