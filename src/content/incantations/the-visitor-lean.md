---
title: "The Visitor"
description: "An external entity traverses the abstract syntax tree of a ward, extracting its magical properties without modifying its pure structure."
type: lean
gofPattern: Visitor
gofCategory: Behavioral
arcaneSchool: "Divination // Analysis"
formula: |2
  namespace MathematicalWards

  inductive GeometricNode where
    | circle (radius : Nat)
    | square (side : Nat)
    | union (a b : GeometricNode)

  class GeometricVisitor (V : Type) where
    visitCircle : V → Nat → V
    visitSquare : V → Nat → V

  def accept {V : Type} [GeometricVisitor V] (node : GeometricNode) (visitor : V) : V :=
    match node with
    | GeometricNode.circle r => GeometricVisitor.visitCircle visitor r
    | GeometricNode.square s => GeometricVisitor.visitSquare visitor s
    | GeometricNode.union a b =>
        let v' := accept a visitor
        accept b v'

  structure AreaCalculator where
    total : Nat

  instance : GeometricVisitor AreaCalculator where
    visitCircle v r := { total := v.total + (3 * r * r) } -- Approximation for integer math
    visitSquare v s := { total := v.total + (s * s) }

  end MathematicalWards
tags: [behavioral, lean4, visitor, wards]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
Using typeclasses to emulate double-dispatch, the Visitor traverses complex inductive data types to compute properties externally.
