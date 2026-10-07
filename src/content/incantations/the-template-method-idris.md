---
title: "The Template Method: The Skeleton Ritual"
description: "Defining the skeleton of an algorithm, deferring specific steps to subclasses or functions."
type: idris
gofPattern: Template Method
gofCategory: Behavioral
arcaneSchool: "Conjuration // Ritual-Frameworks"
formula: |2
  module TemplateMethod
  
  -- The Template
  record RitualSkeleton where
    constructor MkSkeleton
    prepare : String
    ignite : String
    banish : String
  
  performRitual : RitualSkeleton -> String
  performRitual (MkSkeleton p i b) = 
    "Start. " ++ p ++ " -> " ++ i ++ " -> " ++ b ++ " .End"
  
  -- Specific Implementations
  demonSummoning : RitualSkeleton
  demonSummoning = MkSkeleton "Draw Blood Sigil" "Burn Brimstone" "Bind Name"
  
  angelInvoking : RitualSkeleton
  angelInvoking = MkSkeleton "Chant Hymn" "Light Incense" "Offer Grace"
tags: [behavioral, records, frameworks]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

Every great invocation shares a cosmic cadence: preparation, ignition, and resolution. The Template Method formalizes this sequence into a `RitualSkeleton`. It locks the overarching structure of the algorithm in place (`performRitual`), whilst leaving the precise alchemical details to be injected later. The Theorem Proving Pacts enforce that no step in the sequence can ever be omitted by a negligent apprentice.
