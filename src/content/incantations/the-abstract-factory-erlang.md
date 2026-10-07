---
title: The Abstract Factory of the Hive Switchboard
description: Conjuring entire lineages of fault-tolerant spirits from the aether.
type: erlang
gofPattern: Abstract Factory
gofCategory: Creational
arcaneSchool: Conjuration // Threadmancy
formula: |
  -module(the_abstract_factory).
  -export([spawn_spirit/1, spawn_demon/1]).
  
  spawn_spirit(Factory) -> Factory:create_spirit().
  spawn_demon(Factory) -> Factory:create_demon().
  
  -module(light_factory).
  -export([create_spirit/0, create_demon/0]).
  create_spirit() -> spawn(fun() -> io:format("Light spirit awakened.~n") end).
  create_demon() -> spawn(fun() -> io:format("Light demon bound.~n") end).
tags: [erlang, actors, telepathy, switchboard, abstract-factory]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
# The Abstract Factory

In the Hive Switchboard, entire ethereal families are summoned via factories passed across the void as pure telepathic intent.
