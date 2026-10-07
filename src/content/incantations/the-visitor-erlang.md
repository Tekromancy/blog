---
title: The Visitor of the Hive Switchboard
description: Sending itinerant spirits to traverse and mutate complex data grids.
type: erlang
gofPattern: Visitor
gofCategory: Behavioral
arcaneSchool: Conjuration // Pathfinding
formula: |
  -module(the_visitor).
  -export([visit/2]).
  
  visit([], _VisitorFun) -> ok;
  visit([Node|Rest], VisitorFun) ->
      VisitorFun(Node),
      visit(Rest, VisitorFun);
  visit({Node1, Node2}, VisitorFun) ->
      visit(Node1, VisitorFun),
      visit(Node2, VisitorFun).
tags: [erlang, actors, telepathy, switchboard, visitor]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
# The Visitor

Instead of making the structure aware of all possible operations, we send a lambda phantom to traverse the deep recursion and enact changes node by node.
