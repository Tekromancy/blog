---
title: The Chain of Responsibility of the Ancestral Monad
description: Passing requests along a chain of pure monadic handlers.
type: miranda
gofPattern: Chain of Responsibility
gofCategory: Behavioral
arcaneSchool: "Enchantment // Ancestral Monad"
formula: |2
  || The Chain filters pure requests through the Ancestral Monad's essence.
  
  handler == num -> [char]
  
  chain_handler1 :: handler -> handler
  chain_handler1 next x = if x < 10 then "Handled by H1" else next x
  
  chain_handler2 :: handler -> handler
  chain_handler2 next x = if x < 20 then "Handled by H2" else next x
  
  default_handler :: handler
  default_handler x = "Unhandled anomaly in the Ancestral Monad"
  
  monadic_chain :: handler
  monadic_chain = chain_handler1 (chain_handler2 default_handler)
tags: [miranda, behavioral, chain-of-responsibility, ancestral-monad]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
