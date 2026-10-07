---
title: The Bridge of Ethereal Realms
description: Decouple an arcane abstraction from its implementation using predicate matching.
type: prolog
gofPattern: Bridge
gofCategory: Structural
arcaneSchool: "Conjuration // Planarmancy"
formula: |2
  % Implementor: The Realm
  realm_effect(abyssal, entity(Demon), 'is shrouded in darkness').
  realm_effect(celestial, entity(Angel), 'radiates blinding light').

  % Abstraction: The Summoning Ritual
  % Decoupled from the specific realm effects
  ritual_summon(Realm, EntityName) :-
      Entity = entity(EntityName),
      realm_effect(Realm, Entity, Effect),
      format('The ~w ~w as it enters the material plane.', [EntityName, Effect]).

  % ?- ritual_summon(celestial, seraph).
  % "The seraph radiates blinding light as it enters the material plane."
tags: [bridge, structural, prolog, decoupling, planes]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
