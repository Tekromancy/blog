---
title: "Interpreter in PostScript"
description: "Evaluate a mini-language for fractal conjuration and custom geometric spells."
type: postscript
gofPattern: Interpreter
gofCategory: Behavioral
arcaneSchool: "Divination // Script Parsing"
formula: |2
  % Interpreter in PostScript
  /InterpretLSystem {
    dup (F) eq { (Drawing Line Forward...\n) print } if
    dup (+) eq { (Rotating Matrix Right...\n) print } if
    dup (-) eq { (Rotating Matrix Left...\n) print } if
    pop
  } bind def
  
  [ (F) (+) (F) (-) (F) ] { InterpretLSystem } forall
tags: [postscript, print-daemon, behavioral, interpreter]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---
# Interpreter: The L-System Oracle

PostScript itself is a language, but sometimes a higher-level or domain-specific language—like a string of fractal L-System runes—is required. The Interpreter iterates over these compact symbolic tokens and translates them into the raw spatial matrix operations required to physically manifest the fractal.
