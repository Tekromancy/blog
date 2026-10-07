---
title: The Observer Incantation
description: A one-to-many dependency so that when a celestial body changes state, all bound artifacts are updated.
type: mathematica
gofPattern: Observer
gofCategory: Behavioral
arcaneSchool: "Divination // Synchronicity"
formula: |2
  (* The Observable Subject *)
  ClearAll[CelestialBody, AddObserver, NotifyObservers, SetPhase];

  CelestialBody[name_] := Module[{observers = {}, phase = "New"},
    <|
      "AddObserver" -> Function[obs, AppendTo[observers, obs]],
      "SetPhase" -> Function[newPhase, 
        phase = newPhase; 
        Print["[", name, "] phase shifted to: ", phase];
        Scan[#[phase]&, observers]
      ]
    |>
  ];

  (* The Observers (Functions) *)
  TideWatcher[phase_] := Print["TideWatcher noted phase: ", phase, ". Adjusting tides..."];
  Lycanthrope[phase_] := If[phase === "Full", Print["Lycanthrope transforms!"], Print["Lycanthrope remains calm."]];

  (* Usage *)
  moon = CelestialBody["Luna"];
  moon["AddObserver"][TideWatcher];
  moon["AddObserver"][Lycanthrope];

  moon["SetPhase"]["Waxing"];
  moon["SetPhase"]["Full"];
tags: [observer, behavioral, callbacks, synchronization]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
