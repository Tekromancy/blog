---
title: The Chain of Responsibility of the Hive Switchboard
description: Cascading messages through linked spirits.
type: erlang
gofPattern: Chain of Responsibility
gofCategory: Behavioral
arcaneSchool: Evocation // Cascades
formula: |
  -module(the_chain).
  -export([build_chain/1, handle/2]).
  
  build_chain(Handlers) -> Handlers.
  
  handle([], _Msg) -> unhandled;
  handle([Handler|Rest], Msg) ->
      case Handler(Msg) of
          pass -> handle(Rest, Msg);
          Result -> Result
      end.
tags: [erlang, actors, telepathy, switchboard, chain-of-responsibility]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
# The Chain of Responsibility

A telepathic cascade: each entity inspects the psychic wave. If they cannot decipher it, it passes to the next node in the link.
