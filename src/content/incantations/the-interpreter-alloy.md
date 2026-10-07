---
title: "The Interpreter: The Grammar Forge"
description: "Given a language, define a representation for its grammar along with an interpreter."
type: alloy
gofPattern: Interpreter
gofCategory: Behavioral
arcaneSchool: "Divination // Rune-Parsing"
formula: |2
  abstract sig Rune {
    power: one Int
  }
  
  sig BaseRune extends Rune {}
  
  sig CompoundRune extends Rune {
    left, right: one Rune
  }
  {
    power = plus[left.power, right.power]
  }
  
  fact "Runes Shall Not Consume Themselves" {
    no r: CompoundRune | r in r.^(left + right)
  }
  
  run {} for 4 but 4 Int
tags: [behavioral, interpreter, parsing]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---

# The Interpreter: The Grammar Forge

Parsing the ancient scripts requires a recursive grammar tree. `CompoundRune` nodes aggregate their `power` from their `left` and `right` children using Alloy's built-in `plus` operator. The model guarantees syntactic validity by preventing self-referential cycles within the Abstract Syntax Tree.
