---
title: The Interpreter
description: Parsing an ancient runic language into executable Flash rituals.
type: actionscript
gofPattern: Interpreter
gofCategory: Behavioral
arcaneSchool: "Divination // Runic Parsing"
formula: |2
  package arcana.interpreter {

      public interface IRuneExpression {
          function interpret(context:String):Boolean;
      }

      public class TerminalRune implements IRuneExpression {
          private var data:String;

          public function TerminalRune(data:String) {
              this.data = data;
          }

          public function interpret(context:String):Boolean {
              return context.indexOf(data) != -1;
          }
      }

      public class OrRune implements IRuneExpression {
          private var expr1:IRuneExpression;
          private var expr2:IRuneExpression;

          public function OrRune(e1:IRuneExpression, e2:IRuneExpression) {
              this.expr1 = e1;
              this.expr2 = e2;
          }

          public function interpret(context:String):Boolean {
              return expr1.interpret(context) || expr2.interpret(context);
          }
      }
  }
tags: [interpreter, actionscript, flash, parsing]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---
