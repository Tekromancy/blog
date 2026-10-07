---
title: The Visitor
description: Pattern matching over algebraic data types, cleanly separating operations from structures.
type: haskell
gofPattern: Visitor
gofCategory: Behavioral
arcaneSchool: "Divination // Examination"
formula: |2
  module Visitor where
  data AST = Lit Int | Add AST AST
  visitEval :: AST -> Int
  visitEval (Lit n) = n
  visitEval (Add a b) = visitEval a + visitEval b
tags: [visitor, pattern-matching, behavioral]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
