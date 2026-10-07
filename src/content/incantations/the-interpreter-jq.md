---
title: The Interpreter (jq)
description: Parse and evaluate custom grammar embedded within the JSON matrix.
type: jq
gofPattern: Interpreter
gofCategory: Behavioral
arcaneSchool: "Divination // Comprehension"
formula: |2
  # An AST (Abstract Syntax Tree) in JSON
  # { "op": "MULTIPLY", "left": { "op": "ADD", "left": 2, "right": 3 }, "right": 4 }

  # The Interpreter engine
  def evaluate:
    if type == "number" then .
    elif type == "object" then
      if .op == "ADD" then (.left | evaluate) + (.right | evaluate)
      elif .op == "MULTIPLY" then (.left | evaluate) * (.right | evaluate)
      else error("Unknown rune") end
    else error("Invalid syntax") end;

  # Run the spell
  .ast | evaluate
tags: [jq, json, transmutation, gof]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---

When standard configurations fail, you must weave your own arcane language. The **Interpreter** processes an Abstract Syntax Tree (AST) constructed of JSON nodes. Through deep recursion, `jq` reads the runic operations, executing the embedded logic and transmuting the custom grammar into actionable power.
