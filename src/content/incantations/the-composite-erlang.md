---
title: The Composite of the Hive Switchboard
description: Process supervision trees acting as one hive mind.
type: erlang
gofPattern: Composite
gofCategory: Structural
arcaneSchool: Necromancy // Legion
formula: |
  -module(the_composite).
  -export([broadcast/2]).
  
  broadcast([], _Msg) -> ok;
  broadcast([Pid|Rest], Msg) when is_pid(Pid) -> 
      Pid ! Msg,
      broadcast(Rest, Msg);
  broadcast([List|Rest], Msg) when is_list(List) ->
      broadcast(List, Msg),
      broadcast(Rest, Msg).
tags: [erlang, actors, telepathy, switchboard, composite]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
# The Composite

The Hive Mind treats an individual spirit (Pid) and a cluster (List of Pids) identically, raining psychic commands across the hierarchy.
