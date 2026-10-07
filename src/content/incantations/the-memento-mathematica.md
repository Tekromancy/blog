---
title: The Memento Incantation
description: Capturing and restoring the internal state of a ritual without violating encapsulation.
type: mathematica
gofPattern: Memento
gofCategory: Behavioral
arcaneSchool: "Chronomancy // Restoration"
formula: |2
  (* The Originator *)
  ClearAll[CreateRitual, SetRitualState, SaveToMemento, RestoreFromMemento];

  CreateRitual[] := Module[{state = "Idle"},
    <|
      "SetState" -> Function[newState, state = newState; Print["Ritual state set to: ", state]],
      "Save" -> Function[], state],
      "Restore" -> Function[memento, state = memento; Print["Ritual state restored to: ", state]]
    |>
  ];

  (* Due to how closures capture variables, we rewrite it properly using a closure state variable *)
  RitualObject[] := Module[{internalState = "Idle"},
    Function[cmd,
      Switch[cmd,
        "Get", internalState,
        "Set", Function[val, internalState = val; val],
        "Save", internalState,
        "Restore", Function[memento, internalState = memento; memento]
      ]
    ]
  ];

  (* Usage *)
  ritual = RitualObject[];
  ritual["Set"]["Chanting"];

  (* Save point *)
  memento1 = ritual["Save"];

  ritual["Set"]["Sacrifice"];

  (* Oh no, it went wrong, rewind! *)
  ritual["Restore"][memento1];
  Print["Current State: ", ritual["Get"]];
tags: [memento, behavioral, chronomancy, state-saving]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---
