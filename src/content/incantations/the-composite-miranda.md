---
title: The Composite of the Ancestral Monad
description: Treating individual pure forms and compositions uniformly in the Ancestral Monad.
type: miranda
gofPattern: Composite
gofCategory: Structural
arcaneSchool: "Transmutation // Ancestral Monad"
formula: |2
  || The Composite allows infinite recursion of the Ancestral Monad.
  
  monad_tree ::= Leaf string | Branch [monad_tree]
  
  evaluate_tree :: monad_tree -> string
  evaluate_tree (Leaf v) = v
  evaluate_tree (Branch xs) = concat (map evaluate_tree xs)
                              where
                                concat [] = ""
                                concat (y:ys) = y ++ " " ++ concat ys
  
  root_tree :: monad_tree
  root_tree = Branch [Leaf "Pure", Branch [Leaf "Ancestral", Leaf "Monad"]]
tags: [miranda, structural, composite, ancestral-monad]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
