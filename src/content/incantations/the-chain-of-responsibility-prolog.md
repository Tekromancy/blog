---
title: The Chain of Arcane Wards
description: Pass a magical intrusion through a chain of defensive wards until one handles it.
type: prolog
gofPattern: Chain of Responsibility
gofCategory: Behavioral
arcaneSchool: "Abjuration // Wardmancy"
formula: |2
  % Handlers in the chain
  handle_intrusion(ThreatLevel) :-
      ThreatLevel =< 2,
      write('Minor ward repels the intrusion.').

  handle_intrusion(ThreatLevel) :-
      ThreatLevel > 2, ThreatLevel =< 5,
      write('Greater shield absorbs the magical force.').

  handle_intrusion(ThreatLevel) :-
      ThreatLevel > 5,
      write('Archmage summoned! The threat is too great!').

  % The chain processes sequentially thanks to Prolog's rule ordering and backtracking.
  % We use a simple cut to stop the chain once handled.
  process_threat(ThreatLevel) :-
      handle_intrusion(ThreatLevel), !.

  % ?- process_threat(4).
  % "Greater shield absorbs the magical force."
tags: [chain-of-responsibility, behavioral, prolog, wards, defense]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
