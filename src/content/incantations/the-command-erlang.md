---
title: The Command of the Hive Switchboard
description: Encapsulating arcane rituals as pure messages.
type: erlang
gofPattern: Command
gofCategory: Behavioral
arcaneSchool: Enchantment // Seals
formula: |
  -module(the_command).
  -export([execute/1]).
  
  %% A command is a fun() or a tuple {M, F, A}
  execute(CommandFun) when is_function(CommandFun) ->
      CommandFun();
  execute({M, F, A}) ->
      apply(M, F, A).
tags: [erlang, actors, telepathy, switchboard, command]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
# The Command

Spells stored in crystal. A closure or MFA tuple is passed through the Switchboard, ready to unleash its stored power at a moment's notice.
