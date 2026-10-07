---
title: The Builder of the Hive Switchboard
description: Constructing complex spirit vessels step-by-step through the immaterium.
type: erlang
gofPattern: Builder
gofCategory: Creational
arcaneSchool: Transmutation // Vesselcraft
formula: |
  -module(the_builder).
  -export([new/0, with_core/2, with_shell/2, build/1]).
  
  new() -> #{}.
  with_core(Vessel, Core) -> maps:put(core, Core, Vessel).
  with_shell(Vessel, Shell) -> maps:put(shell, Shell, Vessel).
  build(Vessel) -> {ok, Vessel}.
tags: [erlang, actors, telepathy, switchboard, builder]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
# The Builder

We forge complex actors incrementally, layering psychic armor and logic cores before giving them the spark of life (process spawn).
