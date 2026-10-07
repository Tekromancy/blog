---
title: The Template Method
description: Higher-order functions defining the skeletal structure of a spell.
type: haskell
gofPattern: Template Method
gofCategory: Behavioral
arcaneSchool: Necromancy // Skeletons
formula: |
  module TemplateMethod where
  template :: (String -> String) -> String -> String
  template step1 input = "Start -> " ++ step1 input ++ " -> End"
tags: [template, hof, behavioral]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
