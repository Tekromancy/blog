---
title: The Strategy of the Hive Switchboard
description: Passing higher-order runes to dictate combat logic.
type: erlang
gofPattern: Strategy
gofCategory: Behavioral
arcaneSchool: Evocation // Tactics
formula: |
  -module(the_strategy).
  -export([execute/2]).
  
  execute(Data, StrategyFun) ->
      StrategyFun(Data).
tags: [erlang, actors, telepathy, switchboard, strategy]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
# The Strategy

The algorithm itself is a pure lambda, hurled across the switchboard as a parameter to dictate how a spirit should act.
