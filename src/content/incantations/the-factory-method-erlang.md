---
title: The Factory Method of the Hive Switchboard
description: Deferring spirit incarnation to specialized sub-cults.
type: erlang
gofPattern: Factory Method
gofCategory: Creational
arcaneSchool: Conjuration // Calling
formula: |
  -module(the_factory_method).
  -export([summon/1]).
  
  summon(Type) -> 
      Pid = create(Type),
      {ok, Pid}.
      
  create(warrior) -> spawn(fun() -> warrior_loop() end);
  create(mage) -> spawn(fun() -> mage_loop() end).
  
  warrior_loop() -> receive _ -> warrior_loop() end.
  mage_loop() -> receive _ -> mage_loop() end.
tags: [erlang, actors, telepathy, switchboard, factory-method]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
# The Factory Method

The exact essence of the spirit is determined by the runes passed in, shielding the caller from the raw psychic mechanics of creation.
