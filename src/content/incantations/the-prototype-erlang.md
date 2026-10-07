---
title: The Prototype of the Hive Switchboard
description: Cloning process state via psychic imprinting.
type: erlang
gofPattern: Prototype
gofCategory: Creational
arcaneSchool: "Illusion // Cloning"
formula: |2
  -module(the_prototype).
  -export([clone/1]).

  clone(State) ->
      spawn(fun() -> loop(State) end).

  loop(State) ->
      receive
          {update, NewState} -> loop(NewState);
          {get, Caller} -> Caller ! State, loop(State)
      end.
tags: [erlang, actors, telepathy, switchboard, prototype]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
# The Prototype

Why conjure from scratch when you can imprint the memory of one spirit onto a newborn thread in the Switchboard?
