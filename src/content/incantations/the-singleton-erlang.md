---
title: The Singleton of the Hive Switchboard
description: The solitary eternal process, registered in the cosmic registry.
type: erlang
gofPattern: Singleton
gofCategory: Creational
arcaneSchool: "Abjuration // Anchoring"
formula: |2
  -module(the_singleton).
  -export([start/0, get_instance/0]).

  start() ->
      case whereis(the_one) of
          undefined -> 
              Pid = spawn(fun loop/0),
              register(the_one, Pid),
              {ok, Pid};
          Pid -> {ok, Pid}
      end.

  get_instance() -> whereis(the_one).

  loop() -> receive _ -> loop() end.
tags: [erlang, actors, telepathy, switchboard, singleton]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
# The Singleton

A globally registered named process. The one true beacon in the chaotic void of the Hive Switchboard.
