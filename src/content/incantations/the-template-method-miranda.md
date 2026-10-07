---
title: The Template Method of the Ancestral Monad
description: Defining the skeleton of a pure algorithm, deferring steps to injected functions.
type: miranda
gofPattern: Template Method
gofCategory: Behavioral
arcaneSchool: "Enchantment // Ancestral Monad"
formula: |2
  || Template Method supplies the structure, caller supplies the pieces.
  
  template_algorithm :: (num -> num) -> (num -> num) -> num -> num
  template_algorithm step1 step2 input = step2 (step1 input)
  
  concrete_step1 :: num -> num
  concrete_step1 x = x * 2
  
  concrete_step2 :: num -> num
  concrete_step2 x = x + 10
  
  final_invocation :: num -> num
  final_invocation = template_algorithm concrete_step1 concrete_step2
tags: [miranda, behavioral, template-method, ancestral-monad]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
