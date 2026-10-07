---
title: "The Interpreter: The Sigil Decoder"
description: "Define a representation of a grammar and an interpreter to evaluate sentences within it."
type: gdscript
gofPattern: Interpreter
gofCategory: Behavioral
arcaneSchool: "Divination // Linguistics"
formula: |2
  class_name Expression extends RefCounted
  func interpret(context: Dictionary) -> bool:
      return false

  class_name TerminalExpression extends Expression
  var data: String
  func _init(d: String) -> void: data = d
  func interpret(context: Dictionary) -> bool:
      return context.has(data) and context[data] == true

  class_name AndExpression extends Expression
  var expr1: Expression
  var expr2: Expression
  func _init(e1: Expression, e2: Expression) -> void:
      expr1 = e1
      expr2 = e2
  func interpret(context: Dictionary) -> bool:
      return expr1.interpret(context) and expr2.interpret(context)
tags: [godot, gdscript, interpreter, parsing, grammar]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---
When the fabric of your game requires its own internal logic language—such as a dialogue condition evaluator or custom scripting layer—the Interpreter provides the means. It transforms raw string sigils into a living syntax tree, traversing the nodes to manifest boolean truths from the aether.
