---
title: Interpreter
description: Parse and evaluate ancient runes and domain-specific incantations.
type: elixir
gofPattern: Interpreter
gofCategory: Behavioral
arcaneSchool: Divination // Rune-Reading
formula: |
  defmodule Tekromancy.RuneInterpreter do
    def eval({:add, left, right}), do: eval(left) + eval(right)
    def eval({:mult, left, right}), do: eval(left) * eval(right)
    def eval(number) when is_number(number), do: number
    
    # Evaluating a rune sequence: {:add, 10, {:mult, 2, 5}} => 20
  end
tags: [elixir, behavioral, interpreter, ast, parsing]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The raw AST (Abstract Syntax Tree) of Elixir lends itself naturally to the Interpreter pattern. By defining a simple grammar using tuples and leveraging pattern matching, a warlock can effortlessly evaluate nested esoteric runes, executing domain-specific languages designed to shape reality.
