---
title: The Memento of the Chronomancer
description: Capture and restore the state of the universe using magical snapshots.
type: prolog
gofPattern: Memento
gofCategory: Behavioral
arcaneSchool: "Transmutation // Chronomancy"
formula: |2
  :- dynamic current_timeline/1.

  % Set initial timeline
  init_timeline :-
      asserta(current_timeline(state(peaceful, year_1000))).

  % Create Memento
  create_memento(Memento) :-
      current_timeline(Memento).

  % Restore from Memento
  restore_memento(Memento) :-
      retractall(current_timeline(_)),
      asserta(current_timeline(Memento)).

  % Mutate state
  cause_cataclysm :-
      retract(current_timeline(_)),
      asserta(current_timeline(state(apocalyptic, year_1001))).

  % ?- init_timeline, create_memento(M), cause_cataclysm, current_timeline(S1), restore_memento(M), current_timeline(S2).
  % M = state(peaceful, year_1000),
  % S1 = state(apocalyptic, year_1001),
  % S2 = state(peaceful, year_1000).
tags: [memento, behavioral, prolog, time-travel, state]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
