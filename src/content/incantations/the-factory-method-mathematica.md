---
title: The Factory Method Incantation
description: Deferring symbolic manifestation to specialized sub-rituals using DownValues.
type: mathematica
gofPattern: Factory Method
gofCategory: Creational
arcaneSchool: "Conjuration // Rulemancy"
formula: |2
  (* The Base Creator *)
  ClearAll[SummonFamiliar, FamiliarSummoner, RavenSummoner, CatSummoner];

  (* Deferring the actual summoning to specific rule definitions *)
  SummonFamiliar[summoner_] := Module[{familiar},
    familiar = summoner["Create"];
    Print["Summoned a familiar: ", familiar];
    familiar
  ];

  (* Specific Factory Implementations *)
  RavenSummoner["Create"] := {"Type" -> "Raven", "Flight" -> True, "Wisdom" -> 10};
  CatSummoner["Create"] := {"Type" -> "Cat", "Stealth" -> True, "Agility" -> 15};

  (* Usage *)
  SummonFamiliar[RavenSummoner];
  SummonFamiliar[CatSummoner];
tags: [creation, delegation, downvalues, rules]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
