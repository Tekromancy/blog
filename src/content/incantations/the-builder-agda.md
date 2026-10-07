---
title: "The Builder Protocol"
description: "Step-by-step assembly of complex magical constructs via type-safe accumulators."
type: agda
gofPattern: Builder
gofCategory: Creational
arcaneSchool: "Transmutation // Construct Assembly"
formula: |2
  module BuilderPattern where
  
  open import Data.String
  open import Data.Nat
  
  record Golem : Set where
    field
      core : String
      limbs : ℕ
      
  record GolemBuilder : Set where
    field
      setCore : String → GolemBuilder
      addLimb : GolemBuilder
      build   : Golem
tags: ["agda", "builder", "dependent-types", "cyber-magic"]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
# The Builder Protocol

When forging a complex structural Golem or a dense neural matrix, one mistake in the incantation order can result in catastrophic mana-burn. The **Builder** protocol dictates that we construct our spell piece by piece.

## The Dependent Runes

With dependent types, we could even index `GolemBuilder` by its current state, ensuring at compile-time that a Golem cannot be extracted before its core is initialized!
