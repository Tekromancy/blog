---
title: The Decorator of the Hive Switchboard
description: Wrapping message passing with arcane wards and filters.
type: erlang
gofPattern: Decorator
gofCategory: Structural
arcaneSchool: "Abjuration // Warding"
formula: |2
  -module(the_decorator).
  -export([with_logging/1]).

  with_logging(Fun) ->
      fun(Args) ->
          io:format("Invoking with ~p~n", [Args]),
          Result = Fun(Args),
          io:format("Result: ~p~n", [Result]),
          Result
      end.
tags: [erlang, actors, telepathy, switchboard, decorator]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
# The Decorator

Higher-order functions allow us to wrap core rituals with layers of observation, logging, and psychic protection.
