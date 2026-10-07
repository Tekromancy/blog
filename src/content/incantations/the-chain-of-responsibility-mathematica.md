---
title: The Chain of Responsibility Incantation
description: Passing an arcane anomaly through a sequence of wards until one neutralizes it.
type: mathematica
gofPattern: Chain of Responsibility
gofCategory: Behavioral
arcaneSchool: "Abjuration // Channelling"
formula: |2
  (* Establishing the Wards using rules and ReplaceList/ReplaceRepeated *)
  ClearAll[HandleAnomaly];

  Ward1 = {anomaly_ /; anomaly < 10 :> "Handled by Ward 1"};
  Ward2 = {anomaly_ /; anomaly >= 10 && anomaly < 50 :> "Handled by Ward 2"};
  Ward3 = {anomaly_ /; anomaly >= 50 :> "Handled by Ward 3 (High Danger)"};

  (* Combining the wards into a single chain of rules *)
  ChainOfWards = Join[Ward1, Ward2, Ward3];

  HandleAnomaly[anomaly_] := anomaly /. ChainOfWards;

  (* Usage *)
  Print[HandleAnomaly[5]];
  Print[HandleAnomaly[25]];
  Print[HandleAnomaly[100]];
tags: [chain, behavioral, rules, replacement]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
