---
title: The Memento of the Hive Switchboard
description: Snapshotting a spirit's essence to restore it from oblivion.
type: erlang
gofPattern: Memento
gofCategory: Behavioral
arcaneSchool: Necromancy // Stasis
formula: |
  -module(the_memento).
  -export([save/1, restore/1]).
  
  save(State) -> {memento, State}.
  restore({memento, State}) -> State.
tags: [erlang, actors, telepathy, switchboard, memento]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
# The Memento

Taking a core dump of a process state to save its soul, allowing us to roll back time or revive it exactly as it was.
