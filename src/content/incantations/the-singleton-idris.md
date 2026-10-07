---
title: "The Singleton: The One True Nexus"
description: "Ensuring the existence of a solitary, provable node within the mystical grid."
type: idris
gofPattern: Singleton
gofCategory: Creational
arcaneSchool: "Abjuration // Nexus-Binding"
formula: |2
  module Singleton
  
  -- In Idris, singletons are often expressed at the type level.
  -- Here is a type with exactly one inhabitant.
  data GridNexus : Type where
    TheNexus : GridNexus
  
  -- Any function requesting the Singleton implicitly knows its exact shape.
  accessCore : GridNexus -> String
  accessCore TheNexus = "Access Granted to the Cyber-Leyline"
  
  -- Proving that there is only one
  uniqueNexus : (a : GridNexus) -> (b : GridNexus) -> a = b
  uniqueNexus TheNexus TheNexus = Refl
tags: [dependent-types, creational, uniqueness-proofs]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---

The traditional Singleton restricts instantiation via runtime checks and hidden state, but in the realm of Idris, the Theorem Proving Pacts elevate this to an absolute truth. A Singleton is defined as a type with precisely one inhabitant: `TheNexus`. We don't just hope there's only one instance; we prove it mathematically via `uniqueNexus`. No rogue wizard can forge a second Nexus, for the compiler's cosmic logic forbids it.
