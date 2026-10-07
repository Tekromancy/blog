---
title: The Adapter of the Hive Switchboard
description: Translating alien psychic frequencies into familiar Erlang messages.
type: erlang
gofPattern: Adapter
gofCategory: Structural
arcaneSchool: "Transmutation // Translation"
formula: |2
  -module(the_adapter).
  -export([send_message/2]).

  -module(alien_entity).
  -export([transmit_psionic/2]).
  transmit_psionic(Target, Data) -> Target ! {psionic_burst, Data}.

  -module(the_adapter).
  send_message(Target, Msg) ->
      alien_entity:transmit_psionic(Target, term_to_binary(Msg)).
tags: [erlang, actors, telepathy, switchboard, adapter]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
# The Adapter

Bridging the gap between pure Erlang messages and arcane binary protocols of foreign systems.
