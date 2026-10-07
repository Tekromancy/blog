---
title: The Singleton Incantation
description: Ensuring only one instance of an ancient artifact exists within the kernel's memory space.
type: mathematica
gofPattern: Singleton
gofCategory: Creational
arcaneSchool: "Abjuration // Singularity"
formula: |2
  (* Establishing a protected namespace for the Singleton *)
  Begin["`Private`"];

  ClearAll[GetPhilosophersStone];

  (* The uninitialized state *)
  $stoneInstance = Null;

  (* The Accessor Ritual *)
  GetPhilosophersStone[] := 
    If[$stoneInstance === Null,
      Print["Forging the Philosopher's Stone..."];
      $stoneInstance = {"Name" -> "Philosopher's Stone", "Power" -> Infinity};
      $stoneInstance,

      Print["The Stone already exists. Retrieving resonance..."];
      $stoneInstance
    ];

  End[];

  (* Usage *)
  stone1 = GetPhilosophersStone[];
  stone2 = GetPhilosophersStone[];

  Print["Are they the same? ", stone1 === stone2];
tags: [singleton, state, encapsulation, singularity]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
