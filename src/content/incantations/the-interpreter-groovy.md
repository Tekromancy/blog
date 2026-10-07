---
title: The Interpreter Hex
description: Parsing and evaluating custom magical DSLs via Groovy Metaprogramming.
type: groovy
gofPattern: Interpreter
gofCategory: Behavioral
arcaneSchool: "Enchantment // Linguistics"
formula: |2
  class RobotDSL {
      String path = ""

      void up(int steps) { path += "U"*steps }
      void down(int steps) { path += "D"*steps }
      void left(int steps) { path += "L"*steps }
      void right(int steps) { path += "R"*steps }
  }

  def runBot(Closure cl) {
      def dsl = new RobotDSL()
      cl.delegate = dsl
      cl.resolveStrategy = Closure.DELEGATE_ONLY
      cl()
      println "Robot path: ${dsl.path}"
  }

  // The Interpreter executes this custom script
  runBot {
      up 2
      right 3
      down 1
  }
tags: [groovy, behavioral, interpreter, dsl, closure-delegation]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---

# The Interpreter Hex

Groovy's supreme power lies in crafting Domain Specific Languages (DSLs). The Interpreter hex is fundamentally about parsing sentences in a custom language. By setting a closure's delegate and altering its resolution strategy, an Archmage can interpret custom instructions natively within the JVM, turning Groovy code into a command interface for robots or magical constructs.
