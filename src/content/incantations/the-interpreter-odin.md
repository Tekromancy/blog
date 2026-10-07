---
title: The Interpreter
description: Parsing ancient syntactic runes into actionable logic within a specialized context.
type: odin
gofPattern: Interpreter
gofCategory: Behavioral
arcaneSchool: "Divination // Rune Parsing"
formula: |2
  package main
  
  import "core:fmt"
  import "core:strings"
  
  // Context for evaluation
  Rune_Context :: struct {
  	variables: map[string]int,
  }
  
  // Abstract Expression API
  Expression_VTable :: struct {
  	interpret: proc(ctx: rawptr, rune_ctx: ^Rune_Context) -> int,
  }
  
  Expression :: struct {
  	vtable: ^Expression_VTable,
  	data:   rawptr,
  }
  
  // Terminal Expression: Variable
  Var_Expr :: struct {
  	name: string,
  }
  
  var_interpret :: proc(ctx: rawptr, rune_ctx: ^Rune_Context) -> int {
  	v := cast(^Var_Expr)ctx
  	if val, ok := rune_ctx.variables[v.name]; ok {
  		return val
  	}
  	return 0
  }
  
  var_vtable := Expression_VTable{interpret = var_interpret}
  
  // Non-Terminal Expression: Addition
  Add_Expr :: struct {
  	left:  Expression,
  	right: Expression,
  }
  
  add_interpret :: proc(ctx: rawptr, rune_ctx: ^Rune_Context) -> int {
  	a := cast(^Add_Expr)ctx
  	left_val := a.left.vtable.interpret(a.left.data, rune_ctx)
  	right_val := a.right.vtable.interpret(a.right.data, rune_ctx)
  	return left_val + right_val
  }
  
  add_vtable := Expression_VTable{interpret = add_interpret}
  
  main :: proc() {
  	// Context setup
  	rctx := Rune_Context{variables = make(map[string]int)}
  	rctx.variables["alpha"] = 10
  	rctx.variables["omega"] = 42
  	
  	// AST Construction: alpha + omega
  	e1_data := Var_Expr{name = "alpha"}
  	e1 := Expression{vtable = &var_vtable, data = &e1_data}
  	
  	e2_data := Var_Expr{name = "omega"}
  	e2 := Expression{vtable = &var_vtable, data = &e2_data}
  	
  	add_data := Add_Expr{left = e1, right = e2}
  	ast := Expression{vtable = &add_vtable, data = &add_data}
  	
  	// Evaluation
  	result := ast.vtable.interpret(ast.data, &rctx)
  	fmt.printf("Runic Interpretation Result: %d\n", result)
  }
tags: [behavioral, odin, parsing, ast]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---
# The Interpreter

When unearthing domain-specific languages inscribed on monolitic shards, a parser is required to turn static runes into dynamic effects. The Interpreter pattern constructs an Abstract Syntax Tree (AST). In Odin, expressions are constructed through composition of `Expression` structs utilizing procedure pointers. By passing a shared `Rune_Context` through the tree, variables are resolved and mathematical enchantments evaluate safely.
