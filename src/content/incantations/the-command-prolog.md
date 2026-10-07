---
title: The Command of Stored Spells
description: Encapsulate incantations as logical terms to be delayed, queued, or reversed.
type: prolog
gofPattern: Command
gofCategory: Behavioral
arcaneSchool: "Enchantment // Chronomancy"
formula: |2
  % The Commands (Terms)
  % spell(cast_fireball, Target).
  % spell(heal, Target).

  % The Receivers
  execute_command(spell(cast_fireball, Target)) :-
      format('A fireball streaks towards ~w!', [Target]).
  execute_command(spell(heal, Target)) :-
      format('Healing light envelops ~w.', [Target]).

  % The Invoker (Triggering a sequence of stored commands)
  invoke_spells([]).
  invoke_spells([Cmd|Rest]) :-
      execute_command(Cmd), nl,
      invoke_spells(Rest).

  % ?- invoke_spells([spell(cast_fireball, goblin), spell(heal, self)]).
  % A fireball streaks towards goblin!
  % Healing light envelops self.
tags: [command, behavioral, prolog, spells, encapsulation]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
