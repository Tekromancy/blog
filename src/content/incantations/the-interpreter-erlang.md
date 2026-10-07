---
title: The Interpreter of the Hive Switchboard
description: Parsing alien psychic syntax.
type: erlang
gofPattern: Interpreter
gofCategory: Behavioral
arcaneSchool: Divination // Deciphering
formula: |
  -module(the_interpreter).
  -export([eval/2]).
  
  eval({add, Expr1, Expr2}, Env) ->
      eval(Expr1, Env) + eval(Expr2, Env);
  eval({var, Name}, Env) ->
      maps:get(Name, Env);
  eval(Value, _Env) when is_integer(Value) ->
      Value.
tags: [erlang, actors, telepathy, switchboard, interpreter]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
# The Interpreter

We decode the abstract syntax trees of foreign minds, reducing their alien logic down to pure Erlang primitives.
