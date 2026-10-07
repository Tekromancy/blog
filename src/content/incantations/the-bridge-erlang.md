---
title: The Bridge of the Hive Switchboard
description: Decoupling a spirit's interface from its raw manifestation.
type: erlang
gofPattern: Bridge
gofCategory: Structural
arcaneSchool: "Divination // Routing"
formula: |2
  -module(the_bridge).
  -export([invoke/2]).

  invoke(Implementation, Action) ->
      Implementation:execute(Action).

  -module(fire_impl).
  -export([execute/1]).
  execute(burn) -> io:format("Igniting the void~n").
tags: [erlang, actors, telepathy, switchboard, bridge]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
# The Bridge

Passing implementation modules as higher-order arguments to separate the logic of invocation from the raw power being unleashed.
