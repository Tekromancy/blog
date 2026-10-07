---
title: The Builder of Arcane Golems
description: Construct complex magical entities step-by-step using declarative truths.
type: prolog
gofPattern: Builder
gofCategory: Creational
arcaneSchool: "Transmutation // Constructmancy"
formula: |2
  % The Builder predicates define how to assemble components

  % Base construction
  golem_chassis(clay_golem, clay_torso).
  golem_chassis(stone_golem, stone_torso).

  golem_limbs(clay_golem, mud_arms, mud_legs).
  golem_limbs(stone_golem, granite_arms, obsidian_legs).

  golem_animus(clay_golem, spark_of_life).
  golem_animus(stone_golem, heart_of_the_mountain).

  % The Director logic
  build_golem(Type, golem(Chassis, Arms, Legs, Animus)) :-
      golem_chassis(Type, Chassis),
      golem_limbs(Type, Arms, Legs),
      golem_animus(Type, Animus).

  % ?- build_golem(stone_golem, Golem).
  % Golem = golem(stone_torso, granite_arms, obsidian_legs, heart_of_the_mountain).
tags: [builder, creational, prolog, construction, magic]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
