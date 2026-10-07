---
title: "The Interpreter: The Runecarver's Lexicon"
description: "Given a language, defining a representation for its grammar along with an interpreter that uses the representation to evaluate sentences in the language."
type: "crystal"
gofPattern: "Interpreter"
gofCategory: "Behavioral"
arcaneSchool: "Divination // Lexicography"
formula: |2
  class ArcaneContext
    property output : String = ""
  end

  abstract class Expression
    abstract def interpret(context : ArcaneContext)
  end

  class TerminalRune < Expression
    @meaning : String
    def initialize(@meaning : String)
    end

    def interpret(context : ArcaneContext)
      context.output += "#{@meaning} "
    end
  end

  class SequenceRune < Expression
    @expr1 : Expression
    @expr2 : Expression

    def initialize(@expr1 : Expression, @expr2 : Expression)
    end

    def interpret(context : ArcaneContext)
      @expr1.interpret(context)
      @expr2.interpret(context)
    end
  end

  context = ArcaneContext.new

  fire = TerminalRune.new("Ignis")
  ball = TerminalRune.new("Globus")
  fireball = SequenceRune.new(fire, ball)

  fireball.interpret(context)

  puts "Deciphered spell intent: #{context.output.strip}"
tags: ["behavioral", "interpreter", "crystal", "lexicon"]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---
When dealing with deeply nested arcane syntax, the Runecarver's Lexicon builds a syntactic tree. The Interpreter walks this tree, translating sequences of ancient terminal runes into an execution context the modern Crystal engine can fire upon.
