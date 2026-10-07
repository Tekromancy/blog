---
title: The Primordial Interpreter
description: Resolving raw runic strings into abstract syntax constructs of power.
type: c
gofPattern: Interpreter
gofCategory: Behavioral
arcaneSchool: "Divination // Linguistics"
formula: |2
  #include <stdio.h>
  #include <stdlib.h>
  #include <string.h>

  typedef struct Context {
      int variables[26]; // A-Z power levels
  } Context;

  typedef struct Expression Expression;
  struct Expression {
      int (*evaluate)(Expression* self, Context* ctx);
  };

  typedef struct {
      Expression base;
      char var_name;
  } VarExpression;

  int eval_var(Expression* self, Context* ctx) {
      VarExpression* expr = (VarExpression*)self;
      return ctx->variables[expr->var_name - 'A'];
  }

  Expression* create_var_expr(char var_name) {
      VarExpression* e = malloc(sizeof(VarExpression));
      e->base.evaluate = eval_var;
      e->var_name = var_name;
      return (Expression*)e;
  }

  int main() {
      Context ctx;
      memset(ctx.variables, 0, sizeof(ctx.variables));
      ctx.variables['M' - 'A'] = 500; // Mana
      
      Expression* mana_expr = create_var_expr('M');
      int power = mana_expr->evaluate(mana_expr, &ctx);
      
      printf("Interpreted Power: %d\n", power);
      free(mana_expr);
      return 0;
  }
tags: [c, behavioral, interpreter, ast]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---

The Primordial Interpreter parses the fabric of runic syntax. It maps arbitrary textual manifestations onto an executable abstract syntax tree, evaluating esoteric expressions step-by-step through recursive pointer traversals in C.
