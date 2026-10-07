---
title: "The Proxy"
description: "A delayed invocation matrix that postpones the full mathematical evaluation of a dangerous ward until strictly necessary."
type: lean
gofPattern: Proxy
gofCategory: Structural
arcaneSchool: "Abjuration // Delegation"
formula: |2
  namespace MathematicalWards

  class WardInvocation (W : Type) where
    invoke : W → String

  structure HeavyWard where
    complexity : Nat

  instance : WardInvocation HeavyWard where
    invoke w := s!"Heavy ward invoked with complexity {w.complexity}"

  structure WardProxy where
    baseWard : Thunk HeavyWard

  instance : WardInvocation WardProxy where
    invoke p := WardInvocation.invoke p.baseWard.get

  def myProxy : WardProxy :=
    { baseWard := Thunk.mk (fun _ => { complexity := 1000 }) }

  end MathematicalWards
tags: [structural, lean4, proxy, wards]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
The Proxy pattern here relies on Lean's `Thunk` type to delay the expensive instantiation of a ward, only evaluating it when it is invoked.
