---
title: The Decorator of the Ancestral Monad
description: Wrapping pure functions with additional behavior, extending the Ancestral Monad dynamically.
type: miranda
gofPattern: Decorator
gofCategory: Structural
arcaneSchool: "Transmutation // Ancestral Monad"
formula: |2
  || Decorators are higher-order functions in the Ancestral Monad.
  
  component == string -> string
  
  base_component :: component
  base_component s = "Core: " ++ s
  
  decorator_a :: component -> component
  decorator_a comp s = "DecoA (" ++ comp s ++ ")"
  
  decorator_b :: component -> component
  decorator_b comp s = "DecoB (" ++ comp s ++ ")"
  
  decorated_monad :: component
  decorated_monad = decorator_b (decorator_a base_component)
tags: [miranda, structural, decorator, ancestral-monad]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
