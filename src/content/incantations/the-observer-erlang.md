---
title: The Observer of the Hive Switchboard
description: Gen_event streams for global awareness.
type: erlang
gofPattern: Observer
gofCategory: Behavioral
arcaneSchool: "Divination // Scrying"
formula: |2
  -module(the_observer).
  -export([notify/2, listen/1]).

  notify(EventMgr, Event) -> EventMgr ! {event, Event}.

  listen(EventMgr) ->
      EventMgr ! {add_handler, self()}.
tags: [erlang, actors, telepathy, switchboard, observer]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
# The Observer

By registering our pids with a central event manager, we tap directly into the psychic leylines and listen to the pulse of the cluster.
