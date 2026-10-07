---
title: The Proxy Incantation
description: Controlling access to an ancient, computationally expensive ritual.
type: mathematica
gofPattern: Proxy
gofCategory: Structural
arcaneSchool: "Abjuration // Warding"
formula: |2
  (* The Expensive Subject *)
  TrueSummoning[entity_] := (
    Pause[2]; (* Simulating arcane strain *)
    "Summoned the ancient " <> entity
  );

  (* The Proxy Ritual *)
  ClearAll[ProxySummoning];
  ProxySummoning[entity_, credentials_] := 
    If[credentials === "Archmage",
      Print["Access granted. Initiating summoning sequence..."];
      TrueSummoning[entity],

      Print["Access denied. Insufficient arcane credentials."]
    ];

  (* Usage *)
  ProxySummoning["Leviathan", "Acolyte"];
  ProxySummoning["Leviathan", "Archmage"];
tags: [proxy, structural, access-control, laziness]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
