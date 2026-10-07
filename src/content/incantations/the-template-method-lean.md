---
title: "The Template Method"
description: "Defining the unalterable ritual skeleton of an absolute ward, while deferring the exact runes to the invocation."
type: lean
gofPattern: Template Method
gofCategory: Behavioral
arcaneSchool: "Evocation // Rituals"
formula: |2
  namespace MathematicalWards

  structure RitualHooks where
    drawCircle : Unit → String
    chantAxiom : Unit → String
    sealWard : Unit → String

  def performRitual (hooks : RitualHooks) : String :=
    let s1 := hooks.drawCircle ()
    let s2 := hooks.chantAxiom ()
    let s3 := hooks.sealWard ()
    s1 ++ " -> " ++ s2 ++ " -> " ++ s3

  def fireRitual : RitualHooks :=
    { drawCircle := fun _ => "Draw ring of fire",
      chantAxiom := fun _ => "Axiom of Combustion",
      sealWard := fun _ => "Seal with ash" }

  #eval performRitual fireRitual

  end MathematicalWards
tags: [behavioral, lean4, template-method, wards]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
Instead of overriding subclass methods, the Template Method here is realized by accepting a structure of function hooks that fill in the variable steps of the algorithm.
