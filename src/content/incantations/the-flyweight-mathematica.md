---
title: The Flyweight Incantation
description: Sharing common symbolic states to minimize the kernel's memory footprint when summoning vast swarms.
type: mathematica
gofPattern: Flyweight
gofCategory: Structural
arcaneSchool: "Conjuration // Efficiency"
formula: |2
  (* The Shared State Cache (Flyweight Factory) *)
  Begin["`Private`"];
  ClearAll[GetRuneArchetype, $RuneCache];

  $RuneCache = <||>;

  GetRuneArchetype[type_] := 
    If[KeyExistsQ[$RuneCache, type],
      $RuneCache[type],

      Print["Forging new archetype for: ", type];
      $RuneCache[type] = <|"Type" -> type, "Cost" -> StringLength[type]|>;
      $RuneCache[type]
    ];
  End[];

  (* The Extrinsic State Manifestation *)
  CastSwarm[type_, count_] := Module[{archetype},
    archetype = GetRuneArchetype[type];
    Table[Join[archetype, <|"ID" -> i, "Position" -> RandomReal[{0, 10}, 2]|>], {i, count}]
  ];

  (* Usage *)
  swarm1 = CastSwarm["Locust", 3];
  swarm2 = CastSwarm["Locust", 2];
tags: [flyweight, structural, memory, caching]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
