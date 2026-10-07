---
title: "The Poltergeist's Interpreter"
description: "Define an arcane grammar to parse and execute custom haunting scripts, translating strings into ghostly actions."
type: autohotkey
gofPattern: Interpreter
gofCategory: Behavioral
arcaneSchool: "Divination // Ectoplasmic Parsing"
formula: |2
  class Expression {
      Interpret(context) {
          throw Error("Not implemented")
      }
  }

  class TypeExpression extends Expression {
      __New(text) {
          this.text := text
      }
      Interpret(context) {
          Send(this.text)
      }
  }

  class WaitExpression extends Expression {
      __New(time) {
          this.time := time
      }
      Interpret(context) {
          Sleep(this.time)
      }
  }

  ; A simplistic parser that translates a script into expressions
  script := "TYPE:Boo WAIT:500 TYPE:!"
  actions := []
  
  Loop Parse, script, A_Space
  {
      parts := StrSplit(A_LoopField, ":")
      if (parts[1] == "TYPE") {
          actions.Push(TypeExpression(parts[2]))
      } else if (parts[1] == "WAIT") {
          actions.Push(WaitExpression(parts[2]))
      }
  }
  
  for index, expr in actions {
      expr.Interpret("")
  }
tags: [autohotkey, interpreter, automation, poltergeist]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---
