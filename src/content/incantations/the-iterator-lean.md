---
title: "The Iterator"
description: "Sequentially navigating the vertices of a hyper-dimensional ward without exposing its internal representation."
type: lean
gofPattern: Iterator
gofCategory: Behavioral
arcaneSchool: "Divination // Traversal"
formula: |2
  namespace MathematicalWards

  structure WardMatrix (A : Type) where
    elements : List A

  class Iterable (Collection : Type → Type) where
    toList {A : Type} : Collection A → List A

  instance : Iterable WardMatrix where
    toList m := m.elements

  def foldMatrix {A : Type} [Iterable C] (col : C A) (f : Nat → A → Nat) (init : Nat) : Nat :=
    Iterable.toList col |>.foldl f init

  end MathematicalWards
tags: [behavioral, lean4, iterator, wards]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
In functional languages, iteration is often abstracted as a conversion to a list or through direct fold/map typeclasses.
