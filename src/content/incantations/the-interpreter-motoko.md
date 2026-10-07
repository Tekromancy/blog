---
title: The Interpreter Hex
description: Evaluating ancient runic dialects through a grammatical syntax tree.
type: motoko
gofPattern: Interpreter
gofCategory: Behavioral
arcaneSchool: "Divination // Actor Model Hexes"
formula: |2
  module Interpreter {
    public type Context = {
      getVariable : (Text) -> Nat;
      setVariable : (Text, Nat) -> ();
    };
  
    public type Expression = {
      interpret : (Context) -> Nat;
    };
  
    public class NumberExpression(val : Nat) {
      public func interpret(ctx : Context) : Nat {
        val;
      };
    };
  
    public class AddExpression(left : Expression, right : Expression) {
      public func interpret(ctx : Context) : Nat {
        left.interpret(ctx) + right.interpret(ctx);
      };
    };
  
    public class VariableExpression(name : Text) {
      public func interpret(ctx : Context) : Nat {
        ctx.getVariable(name);
      };
    };
  
    public actor RuneReader {
      // Very basic context implementation for actors
      var memory : [(Text, Nat)] = [];
  
      public func getVariable(name : Text) : Nat {
        for ((k, v) in memory.vals()) {
          if (k == name) return v;
        };
        0;
      };
  
      public func setVariable(name : Text, val : Nat) : () {
        memory := Array.append(memory, [(name, val)]);
      };
  
      public func decipherRune() : async Nat {
        let ctx : Context = {
          getVariable = getVariable;
          setVariable = setVariable;
        };
        ctx.setVariable("MANA", 50);
        
        // Tree representing: MANA + 10
        let expr = AddExpression(
          VariableExpression("MANA"),
          NumberExpression(10)
        );
        
        expr.interpret(ctx);
      };
    };
  }
tags: [motoko, behavioral, interpreter, actor-model]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---

When presented with cryptic runic languages, the Interpreter Hex parses the grammar into a syntax tree of discrete expressions. The `RuneReader` actor maintains the context state, passing it through the expressions to derive the ultimate numerical or magical meaning of the dialect.
