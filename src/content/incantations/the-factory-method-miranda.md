---
title: The Factory Method of the Ancestral Monad
description: Deferring instantiation to pure functions that embody the Ancestral Monad's will.
type: miranda
gofPattern: Factory Method
gofCategory: Creational
arcaneSchool: "Conjuration // Ancestral Monad"
formula: |2
  || The Factory Method delegates the pure essence creation.
  
  entity ::= Fire string | Water string
  
  creator :: string -> entity
  creator "flame" = Fire "Burning Monad"
  creator "drop"  = Water "Flowing Monad"
  creator _       = Fire "Default Spark"
  
  manifest :: entity -> string
  manifest (Fire name) = "Manifesting Fire: " ++ name
  manifest (Water name) = "Manifesting Water: " ++ name
  
  invoke_factory :: string -> string
  invoke_factory type_str = manifest (creator type_str)
tags: [miranda, creational, factory-method, ancestral-monad]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
