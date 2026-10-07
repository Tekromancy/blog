---
title: "The Factory Method"
description: "Defines an interface for creating absolute wards, deferring the exact instantiation to the mathematical structure of the subclass."
type: lean
gofPattern: Factory Method
gofCategory: Creational
arcaneSchool: "Conjuration // Axiomatics"
formula: |2
  namespace MathematicalWards

  class WardCreator (T : Type) where
    conjure : String → T

  structure GeometryWard where
    name : String

  instance : WardCreator GeometryWard where
    conjure n := ⟨n ++ " (Geometry)"⟩

  structure ArithmeticWard where
    name : String

  instance : WardCreator ArithmeticWard where
    conjure n := ⟨n ++ " (Arithmetic)"⟩

  def manifestWard {T : Type} [WardCreator T] (name : String) : T :=
    WardCreator.conjure name

  end MathematicalWards
tags: [creational, lean4, factory-method, wards]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
A factory method pattern expressed through Lean 4's powerful typeclass resolution, mapping strings to precise geometric or arithmetic constructs.
