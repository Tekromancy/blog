---
title: The Interpreter
description: "Parsing the ancient runic language of the Abyss into actionable Ruby execution logic."
type: ruby
gofPattern: Interpreter
gofCategory: Behavioral
arcaneSchool: Divination // Linguistics
formula: |
  class Expression
    def interpret(context)
      raise NotImplementedError
    end
  end

  class TerminalBlood < Expression
    def interpret(context)
      context.include?("blood")
    end
  end

  class TerminalSacrifice < Expression
    def interpret(context)
      context.include?("sacrifice")
    end
  end

  class OrExpression < Expression
    def initialize(expr1, expr2)
      @expr1 = expr1
      @expr2 = expr2
    end

    def interpret(context)
      @expr1.interpret(context) || @expr2.interpret(context)
    end
  end

  class AndExpression < Expression
    def initialize(expr1, expr2)
      @expr1 = expr1
      @expr2 = expr2
    end

    def interpret(context)
      @expr1.interpret(context) && @expr2.interpret(context)
    end
  end

  # Usage:
  # is_dark_ritual = AndExpression.new(TerminalBlood.new, TerminalSacrifice.new)
  # is_dark_ritual.interpret("We perform a blood sacrifice today.") # => true
tags: [ruby, design-pattern, interpreter, blood-magic]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---

The Interpreter defines a representation for a grammar along with an interpreter to evaluate sentences in the language. Hemomancers use this to dynamically parse chaotic demonic whispers and determine if the required conditions (e.g., blood AND sacrifice) are met.
