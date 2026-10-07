---
title: The Visitor of the Astral Census
description: Separate the logic of examining magical entities from the entities themselves.
type: prolog
gofPattern: Visitor
gofCategory: Behavioral
arcaneSchool: "Divination // Censusmancy"
formula: |2
  % Elements (Entities in the Astral Realm)
  entity(spirit, ethereal_wisp).
  entity(demon, imp).
  entity(celestial, cherub).

  % Visitor: Power Assessor
  visit(power_assessor, entity(spirit, Name)) :-
      format('~w has 10 ethereal power.', [Name]).
  visit(power_assessor, entity(demon, Name)) :-
      format('~w has 50 infernal power.', [Name]).
  visit(power_assessor, entity(celestial, Name)) :-
      format('~w has 100 divine power.', [Name]).

  % Visitor: Banishment
  visit(banisher, entity(spirit, Name)) :-
      format('~w is gently guided to the afterlife.', [Name]).
  visit(banisher, entity(demon, Name)) :-
      format('~w is cast back to the abyss!', [Name]).
  visit(banisher, entity(celestial, Name)) :-
      format('~w cannot be banished!', [Name]).

  % Object Structure Traversal
  apply_visitor_to_all(Visitor) :-
      entity(Type, Name),
      visit(Visitor, entity(Type, Name)), nl,
      fail.
  apply_visitor_to_all(_).

  % ?- apply_visitor_to_all(power_assessor).
  % ethereal_wisp has 10 ethereal power.
  % imp has 50 infernal power.
  % cherub has 100 divine power.
tags: [visitor, behavioral, prolog, separation, examination]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
