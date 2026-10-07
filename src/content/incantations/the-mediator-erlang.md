---
title: The Mediator of the Hive Switchboard
description: A central switchboard process that routes all telepathy.
type: erlang
gofPattern: Mediator
gofCategory: Behavioral
arcaneSchool: Enchantment // Networking
formula: |
  -module(the_mediator).
  -export([start_link/0, register_node/2, broadcast/2]).
  
  start_link() -> spawn(fun() -> loop([]) end).
  
  register_node(Broker, Pid) -> Broker ! {register, Pid}.
  broadcast(Broker, Msg) -> Broker ! {broadcast, Msg}.
  
  loop(Nodes) ->
      receive
          {register, Pid} -> loop([Pid | Nodes]);
          {broadcast, Msg} ->
              lists:foreach(fun(Node) -> Node ! Msg end, Nodes),
              loop(Nodes)
      end.
tags: [erlang, actors, telepathy, switchboard, mediator]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
# The Mediator

The heart of the Hive. A central broker that tracks all spirits and duplicates psychic messages across the void.
