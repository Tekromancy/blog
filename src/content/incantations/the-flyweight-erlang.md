---
title: The Flyweight of the Hive Switchboard
description: Sharing immutable state via ETS tables.
type: erlang
gofPattern: Flyweight
gofCategory: Structural
arcaneSchool: Enchantment // Binding
formula: |
  -module(the_flyweight).
  -export([init/0, get_shared_lore/1]).
  
  init() ->
      ets:new(lore_table, [named_table, public, read_concurrency]).
      
  get_shared_lore(Key) ->
      case ets:lookup(lore_table, Key) of
          [{Key, Value}] -> Value;
          [] -> undefined
      end.
tags: [erlang, actors, telepathy, switchboard, flyweight]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
# The Flyweight

When thousands of spirits need the exact same memory, we engrave it into the ETS crystalline lattice.
