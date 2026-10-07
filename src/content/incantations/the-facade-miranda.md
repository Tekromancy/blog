---
title: The Facade of the Ancestral Monad
description: Providing a unified interface to a set of complex pure functions in the Ancestral Monad.
type: miranda
gofPattern: Facade
gofCategory: Structural
arcaneSchool: "Transmutation // Ancestral Monad"
formula: |2
  || The Facade hides the chaotic details behind a pure monadic boundary.
  
  subsystem_a :: num -> num
  subsystem_a x = x * x
  
  subsystem_b :: num -> string
  subsystem_b x = "Value: " ++ show x
  
  subsystem_c :: string -> string
  subsystem_c s = "*** " ++ s ++ " ***"
  
  facade_operation :: num -> string
  facade_operation x = subsystem_c (subsystem_b (subsystem_a x))
tags: [miranda, structural, facade, ancestral-monad]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
