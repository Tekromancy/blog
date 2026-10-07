---
title: The State of the Hive Switchboard
description: Finite state machines mapped directly to process behavior.
type: erlang
gofPattern: State
gofCategory: Behavioral
arcaneSchool: "Transmutation // Phase"
formula: |2
  -module(the_state).
  -export([start/0, idle/1, active/1]).

  start() -> spawn(fun() -> idle(#{}) end).

  idle(Data) ->
      receive
          wake -> active(Data)
      end.

  active(Data) ->
      receive
          sleep -> idle(Data)
      end.
tags: [erlang, actors, telepathy, switchboard, state]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
# The State

In Erlang, the State pattern is the lifeblood of gen_statem. A process transitions between phases of existence simply by calling a different function.
