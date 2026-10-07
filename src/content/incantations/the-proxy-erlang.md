---
title: The Proxy of the Hive Switchboard
description: A shadow process standing in for the true entity.
type: erlang
gofPattern: Proxy
gofCategory: Structural
arcaneSchool: Illusion // Phantoms
formula: |
  -module(the_proxy).
  -export([start/1, request/2]).
  
  start(RealTarget) ->
      spawn(fun() -> proxy_loop(RealTarget) end).
      
  request(ProxyPid, Msg) ->
      ProxyPid ! {request, self(), Msg},
      receive {reply, Reply} -> Reply end.
      
  proxy_loop(RealTarget) ->
      receive
          {request, Caller, Msg} ->
              RealTarget ! {request, self(), Msg},
              receive
                  {reply, Reply} -> Caller ! {reply, Reply}
              end,
              proxy_loop(RealTarget)
      end.
tags: [erlang, actors, telepathy, switchboard, proxy]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
# The Proxy

We spin up intermediate phantoms to intercept, delay, or authorize telepathic communiques before they reach the True Mind.
