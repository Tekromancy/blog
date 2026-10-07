---
title: The Template Method of the Hive Switchboard
description: Defining behavioral skeletons via behaviours.
type: erlang
gofPattern: Template Method
gofCategory: Behavioral
arcaneSchool: Necromancy // Skeletons
formula: |
  -module(the_template).
  -export([run_ritual/1]).
  
  -callback initialize() -> ok.
  -callback execute_core() -> any().
  -callback cleanup() -> ok.
  
  run_ritual(Mod) ->
      Mod:initialize(),
      Res = Mod:execute_core(),
      Mod:cleanup(),
      Res.
tags: [erlang, actors, telepathy, switchboard, template-method]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
# The Template Method

Erlang Behaviours define the scaffolding. The module provides the specific rites, while the orchestrator executes the unyielding skeleton of the ritual.
