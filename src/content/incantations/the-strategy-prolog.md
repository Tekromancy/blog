---
title: The Strategy of Magical Combat
description: Dynamically swap spellcasting tactics at runtime via higher-order predicates.
type: prolog
gofPattern: Strategy
gofCategory: Behavioral
arcaneSchool: "Evocation // Tacticmancy"
formula: |2
  % The Strategies (Tactics)
  tactic_aggressive(Target) :-
      format('Casting furious firebolts at ~w!', [Target]).
  tactic_defensive(Target) :-
      format('Raising a shield of ice against ~w!', [Target]).
  tactic_stealth(Target) :-
      format('Fading into the shadows near ~w...', [Target]).

  % The Context
  % Takes a strategy predicate name as an argument and calls it
  engage_combat(Target, Strategy) :-
      call(Strategy, Target).

  % ?- engage_combat(dragon, tactic_defensive).
  % "Raising a shield of ice against dragon!"
tags: [strategy, behavioral, prolog, tactics, dynamic-call]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
