---
title: The Iterator of the Hive Switchboard
description: Traversing infinite ethereal streams.
type: erlang
gofPattern: Iterator
gofCategory: Behavioral
arcaneSchool: Divination // Flow
formula: |
  -module(the_iterator).
  -export([next/1, from_list/1]).
  
  from_list(List) -> List.
  
  next([]) -> empty;
  next([H|T]) -> {H, T}.
tags: [erlang, actors, telepathy, switchboard, iterator]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
# The Iterator

Lists and streams are consumed node by node. State is recursively passed forward, diving deeper into the stream of consciousness.
