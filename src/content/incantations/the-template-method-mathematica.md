---
title: The Template Method Incantation
description: Defining the skeleton of a high ritual, deferring exact elemental steps to subclasses or downvalues.
type: mathematica
gofPattern: Template Method
gofCategory: Behavioral
arcaneSchool: "Evocation // Formalism"
formula: |2
  (* The Skeleton Ritual (Template Method) *)
  ClearAll[PerformRitual, GatherComponents, Chant, Ignite];

  PerformRitual[ritualType_] := Module[{},
    Print["--- Commencing Ritual ---"];
    GatherComponents[ritualType];
    Chant[ritualType];
    Ignite[ritualType];
    Print["--- Ritual Complete ---"];
  ];

  (* Default/Base behaviors if not overridden *)
  GatherComponents[_] := Print["Gathering generic arcane dust."];
  Chant[_] := Print["Chanting in the old tongue."];
  Ignite[_] := Print["Igniting with a standard spark."];

  (* Overriding for specific rituals using Pattern Matching (DownValues) *)
  GatherComponents["BloodMagic"] := Print["Drawing blood from the willing vessel."];
  Chant["BloodMagic"] := Print["Whispering the forbidden crimson syllables."];

  GatherComponents["FrostMagic"] := Print["Collecting pure nevermelt ice."];
  Ignite["FrostMagic"] := Print["Unleashing an absolute zero shockwave."];

  (* Usage *)
  PerformRitual["Standard"];
  Print[""];
  PerformRitual["BloodMagic"];
  Print[""];
  PerformRitual["FrostMagic"];
tags: [template-method, behavioral, pattern-matching, skeleton]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
