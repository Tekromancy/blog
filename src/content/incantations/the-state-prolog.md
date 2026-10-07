---
title: The State of the Elemental Core
description: Alter an entity's behavior dynamically based on its internal elemental attunement.
type: prolog
gofPattern: State
gofCategory: Behavioral
arcaneSchool: "Evocation // Elementmancy"
formula: |2
  % Behaviors based on State
  elemental_reaction(fire_state, 'blasts intense heat').
  elemental_reaction(ice_state, 'freezes the surrounding air').
  elemental_reaction(void_state, 'absorbs all light').

  % Context Entity
  entity_action(EntityName, State) :-
      elemental_reaction(State, Reaction),
      format('The ~w ~w.', [EntityName, Reaction]).

  % State Transitions
  transition(fire_state, cool_down, ice_state).
  transition(ice_state, shatter, void_state).

  % ?- entity_action(golem, fire_state).
  % "The golem blasts intense heat."
  % ?- transition(fire_state, cool_down, NewState), entity_action(golem, NewState).
  % NewState = ice_state.
  % "The golem freezes the surrounding air."
tags: [state, behavioral, prolog, transitions, elements]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
