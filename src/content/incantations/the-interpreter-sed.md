---
title: The Lexical Decoder (Interpreter)
description: Evaluating language grammar through repeated regex substitution rules.
type: sed
gofPattern: Interpreter
gofCategory: Behavioral
arcaneSchool: "Transmutation // Streamweaving"
formula: |2
  # Interpreter: Evaluating a simple stack machine language
  :interpret
  s/PUSH \([0-9]*\) PUSH \([0-9]*\) ADD/\1+\2/
  s/\([0-9]*\)+\([0-9]*\)/.../ # Actually doing math in sed requires massive unary conversion
  # Simplified Interpreter: evaluating macro expansions
  s/MACRO_A/Substitution A/g
  s/MACRO_B/Substitution B/g
  t interpret
tags: [sed, behavioral, interpreter]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---
