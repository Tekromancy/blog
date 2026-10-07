---
title: "The Interpreter"
description: "Parsing a string of ancient characters to evaluate a logical truth."
type: j
gofPattern: Interpreter
gofCategory: Behavioral
arcaneSchool: "Divination // Glyph Parsing"
formula: |2
  NB. A simple interpreter for a custom arcane math language
  NB. Language: 'A' means add, 'M' means multiply
  
  interpret =: 3 : 0
    tokens =. ;: y
    ops =. ('A';'M') ,: ('+';'*')
    translated =. (tokens i. {."1 ops) { {:"1 ops , tokens
    ". ; translated
  )
  
  NB. Usage: interpret '3 A 4 M 2'
tags: [interpreter, evaluation, strings, parsing]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---

Taking advantage of J's sequential machine and `".` (do) to interpret DSLs dynamically.
