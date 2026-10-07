---
title: The Factory Method of Summoning
description: Defer the exact nature of summoned entities to universal rules and axioms.
type: prolog
gofPattern: Factory Method
gofCategory: Creational
arcaneSchool: Conjuration // Entitymancy
formula: |
  % The Creator (Biome / Element)
  element(fire).
  element(water).
  
  % The Factory Method: Summoning based on element
  summon_familiar(fire, fire_salamander).
  summon_familiar(water, water_nymph).
  
  % An operation that uses the factory method
  manifest_presence(Element, Message) :-
      element(Element),
      summon_familiar(Element, Familiar),
      format('You have manifested a ~w from the element of ~w.', [Familiar, Element]).
  
  % ?- manifest_presence(fire, _).
  % "You have manifested a fire_salamander from the element of fire."
tags: [factory-method, creational, prolog, summoning]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
