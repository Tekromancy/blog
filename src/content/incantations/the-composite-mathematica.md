---
title: The Composite Incantation
description: Treating individual runes and complex rune words uniformly via symbolic trees.
type: mathematica
gofPattern: Composite
gofCategory: Structural
arcaneSchool: "Illusion // Gestalt"
formula: |2
  (* Defining the symbolic structure *)
  ClearAll[Rune, RuneWord, EvaluateRune];

  (* Leaf elements *)
  EvaluateRune[Rune[name_, power_]] := power;

  (* Composite elements - naturally recursive in Mathematica *)
  EvaluateRune[RuneWord[runes___]] := Total[EvaluateRune /@ {runes}];

  (* Usage *)
  rune1 = Rune["El", 10];
  rune2 = Rune["Eld", 15];
  rune3 = Rune["Tir", 20];

  word1 = RuneWord[rune1, rune2];
  complexWord = RuneWord[word1, rune3, Rune["Nef", 30]];

  Print["Power of El: ", EvaluateRune[rune1]];
  Print["Power of El-Eld: ", EvaluateRune[word1]];
  Print["Power of complex construct: ", EvaluateRune[complexWord]];
tags: [composite, structural, recursion, symbolic-trees]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
