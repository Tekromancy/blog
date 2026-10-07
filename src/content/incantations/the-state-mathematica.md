---
title: The State Incantation
description: Allowing a summoned entity to alter its behavior when its internal elemental alignment changes.
type: mathematica
gofPattern: State
gofCategory: Behavioral
arcaneSchool: "Transmutation // Metamorphosis"
formula: |2
  (* The States *)
  SolidState[entity_] := Print[entity, " is solid. It blocks attacks."];
  LiquidState[entity_] := Print[entity, " is liquid. Attacks pass through it."];
  GaseousState[entity_] := Print[entity, " is gaseous. It floats away."];

  (* The Context *)
  ClearAll[CreateElemental];
  CreateElemental[name_] := Module[{currentState = SolidState},
    <|
      "Name" -> name,
      "React" :> currentState[name],
      "SetState" -> Function[newState, 
        currentState = newState; 
        Print[name, " shifted its form."]
      ]
    |>
  ];

  (* Usage *)
  golem = CreateElemental["Morphor"];
  golem["React"];

  golem["SetState"][LiquidState];
  golem["React"];

  golem["SetState"][GaseousState];
  golem["React"];
tags: [state, behavioral, metamorphosis, dynamic-typing]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
