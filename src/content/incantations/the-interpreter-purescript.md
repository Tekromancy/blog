---
title: The Interpreter of Web Runes
description: Evaluate strict grammatical syntax of ancient web runes into execution trees.
type: purescript
gofPattern: Interpreter
gofCategory: Behavioral
arcaneSchool: "Divination // Rune Translation"
formula: |2
  module Arcane.Interpreter where
  import Prelude

  data ArcaneExpr
    = Rune String
    | Amplify ArcaneExpr
    | Combine ArcaneExpr ArcaneExpr

  interpret :: ArcaneExpr -> String
  interpret (Rune r) = r
  interpret (Amplify expr) = interpret expr <> "++"
  interpret (Combine e1 e2) = "(" <> interpret e1 <> " + " <> interpret e2 <> ")"

  spellTree :: ArcaneExpr
  spellTree = Combine (Amplify (Rune "Ignis")) (Rune "Aqua")
tags: [behavioral, interpreter, purescript, runes]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---
