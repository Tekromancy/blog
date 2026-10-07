---
title: The Iterator Incantation
description: Traversing a collection of artifacts without exposing their underlying representation.
type: mathematica
gofPattern: Iterator
gofCategory: Behavioral
arcaneSchool: "Divination // Sequencing"
formula: |2
  (* In Mathematica, Map, Scan, and Table act as native iterators. *)
  (* However, we can construct a stateful iterator closure for pure magic. *)
  ClearAll[CreateGrimoireIterator];

  CreateGrimoireIterator[spells_List] := Module[{index = 1, len = Length[spells]},
    <|
      "HasNext" :> (index <= len),
      "Next" :> (If[index <= len, 
                   With[{val = spells[[index]]}, index++; val], 
                   Null]),
      "Reset" :> (index = 1)
    |>
  ];

  (* Usage *)
  grimoire = {"Levitate", "Fireball", "Invisibility"};
  iterator = CreateGrimoireIterator[grimoire];

  While[iterator["HasNext"],
    Print["Reading spell: ", iterator["Next"]]
  ];
tags: [iterator, behavioral, closures, traversal]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
