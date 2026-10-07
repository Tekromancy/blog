---
title: The Interpreter
description: Deciphering an ancient arcane language grammatically.
type: cpp
gofPattern: Interpreter
gofCategory: Behavioral
arcaneSchool: "Divination // Linguistics"
formula: |2
  #include <string>
  class Context { public: std::string input; int output = 0; };
  class Expression {
  public: virtual ~Expression() = default; virtual void Interpret(Context& ctx) = 0;
  };
  class RuneExpression : public Expression {
  public:
      void Interpret(Context& ctx) override {
          if(ctx.input == "IGNIS") ctx.output += 10;
      }
  };
tags: [behavioral, interpreter, cpp]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
