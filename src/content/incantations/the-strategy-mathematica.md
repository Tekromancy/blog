---
title: The Strategy Incantation
description: Encapsulating algorithmic combat stances to be dynamically swapped during a duel.
type: mathematica
gofPattern: Strategy
gofCategory: Behavioral
arcaneSchool: "Divination // Tactics"
formula: |2
  (* The Strategies *)
  AggressiveStance[power_] := Print["Striking fiercely for ", power * 2, " damage!"];
  DefensiveStance[power_] := Print["Guarding, storing ", power, " energy for retaliation."];
  EvasiveStance[power_] := Print["Dodging swiftly! ", power, " agility utilized."];

  (* The Context (Duelist) *)
  ClearAll[CreateDuelist];
  CreateDuelist[name_, basePower_] := Module[{stance = AggressiveStance},
    <|
      "Name" -> name,
      "Act" :> stance[basePower],
      "ChangeStance" -> Function[newStance, 
        stance = newStance; 
        Print[name, " shifted their combat stance."]
      ]
    |>
  ];

  (* Usage *)
  duelist = CreateDuelist["Kael", 15];
  duelist["Act"];

  duelist["ChangeStance"][DefensiveStance];
  duelist["Act"];

  duelist["ChangeStance"][EvasiveStance];
  duelist["Act"];
tags: [strategy, behavioral, tactics, pure-functions]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
