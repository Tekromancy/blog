---
title: The Template Method of Ritual Casting
description: Define the skeleton of a magical ritual, letting subclasses fill in specific elements.
type: prolog
gofPattern: Template Method
gofCategory: Behavioral
arcaneSchool: Conjuration // Ritualmancy
formula: |
  % The Template (The Ritual Skeleton)
  perform_ritual(RitualType) :-
      prepare_components(RitualType),
      chant_words(RitualType),
      release_power(RitualType).
      
  % Default or shared steps (if any) could go here.
  
  % Concrete Implementations (The Subclasses)
  % Ritual: Summoning
  prepare_components(summoning) :- write('Drawing the summoning circle... '), nl.
  chant_words(summoning) :- write('Chanting the names of the old ones... '), nl.
  release_power(summoning) :- write('The entity arrives!').
  
  % Ritual: Scrying
  prepare_components(scrying) :- write('Filling the silver bowl with water... '), nl.
  chant_words(scrying) :- write('Whispering the seer''s oath... '), nl.
  release_power(scrying) :- write('The vision clears!').
  
  % ?- perform_ritual(scrying).
  % Filling the silver bowl with water...
  % Whispering the seer's oath...
  % The vision clears!
tags: [template-method, behavioral, prolog, skeleton, rituals]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
