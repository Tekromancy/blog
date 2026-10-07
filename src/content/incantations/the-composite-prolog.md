---
title: The Composite of Mystical Hierarchies
description: Treat individual spells and spellbook structures uniformly via recursive queries.
type: prolog
gofPattern: Composite
gofCategory: Structural
arcaneSchool: "Evocation // Treemancy"
formula: |2
  % Leaf nodes: Individual Spells
  spell(magic_missile, 10).
  spell(shield, 5).
  spell(teleport, 50).

  % Composite nodes: Spellbooks containing spells or other spellbooks
  spellbook(apprentice_tome, [magic_missile, shield]).
  spellbook(archmage_tome, [apprentice_tome, teleport]).

  % Recursive cost calculation for the Composite structure
  arcane_cost(Spell, Cost) :-
      spell(Spell, Cost).

  arcane_cost(Book, TotalCost) :-
      spellbook(Book, Contents),
      calculate_list_cost(Contents, TotalCost).

  calculate_list_cost([], 0).
  calculate_list_cost([Head|Tail], Total) :-
      arcane_cost(Head, HeadCost),
      calculate_list_cost(Tail, TailCost),
      Total is HeadCost + TailCost.

  % ?- arcane_cost(archmage_tome, Cost).
  % Cost = 65.
tags: [composite, structural, prolog, recursion, hierarchy]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
