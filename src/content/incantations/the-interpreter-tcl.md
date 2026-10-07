---
title: The Interpreter
description: Defines a grammatical representation for an arcane language and an interpreter to decipher it.
type: tcl
gofPattern: Interpreter
gofCategory: Behavioral
arcaneSchool: "Divination // Linguistics"
formula: |2
  oo::class create Expression {
      method interpret {context} { error "Not implemented" }
  }

  oo::class create TerminalExpression {
      variable data
      constructor {d} { set data $d }
      method interpret {context} {
          return [string match "*$data*" $context]
      }
  }

  oo::class create OrExpression {
      variable expr1 expr2
      constructor {e1 e2} { set expr1 $e1; set expr2 $e2 }
      method interpret {context} {
          expr {[$expr1 interpret $context] || [$expr2 interpret $context]}
      }
  }

  set isCyber [TerminalExpression new "cyber"]
  set isMagic [TerminalExpression new "magic"]
  set isTekromancer [OrExpression new $isCyber $isMagic]

  puts "Is 'I wield cyber magic' tekromancy? [$isTekromancer interpret "I wield cyber magic"]"
  puts "Is 'Just an ordinary day' tekromancy? [$isTekromancer interpret "Just an ordinary day"]"
tags: [behavioral, interpreter, divination, parsing]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---

# The Interpreter

The cosmos is built on language, and parsing the True Syntax grants immense power. The Interpreter creates a syntax tree of logical nodes that evaluate raw linguistic context. It breaks down the incantations of the universe, extracting meaning from chaotic strings.
