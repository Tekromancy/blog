---
title: The Iterator of the Astral Plane
description: Traverse collections of planar entities using Prolog's built-in backtracking.
type: prolog
gofPattern: Iterator
gofCategory: Behavioral
arcaneSchool: Divination // Planarmancy
formula: |
  % A collection of knowledge
  astral_entity(spirit_of_wisdom).
  astral_entity(echo_of_time).
  astral_entity(void_walker).
  
  % Iteration in Prolog is inherently handled by backtracking
  % To iterate over all entities and perform an action:
  commune_with_all :-
      astral_entity(Entity),
      format('Communing with ~w...', [Entity]), nl,
      fail. % Force backtrack to find the next
  commune_with_all. % Succeed when no more entities exist
  
  % ?- commune_with_all.
  % Communing with spirit_of_wisdom...
  % Communing with echo_of_time...
  % Communing with void_walker...
  % true.
tags: [iterator, behavioral, prolog, traversal, spirits]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
