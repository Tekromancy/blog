---
title: The Singleton of the Universal Truth
description: Enforce a single point of truth in the universe using dynamic predicates.
type: prolog
gofPattern: Singleton
gofCategory: Creational
arcaneSchool: Divination // Truthmancy
formula: |
  % In Prolog, a Singleton can be modeled using a dynamic predicate
  % that holds the single state of the universe.
  
  :- dynamic the_oracle/1.
  
  % Initialize the Oracle if it does not exist
  init_oracle :-
      \+ the_oracle(_),
      asserta(the_oracle(state(sleeping))),
      !.
  init_oracle. % Do nothing if it already exists
  
  % Access the Singleton
  get_oracle_state(State) :-
      the_oracle(State).
      
  % Mutate the Singleton (Arcane Ritual)
  awaken_oracle :-
      retract(the_oracle(_)),
      asserta(the_oracle(state(awakened))).
      
  % ?- init_oracle, awaken_oracle, get_oracle_state(S).
  % S = state(awakened).
tags: [singleton, creational, prolog, dynamic-facts, universe]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
