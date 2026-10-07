---
title: The Visitor Incantation
description: Adding new operations to a heterogeneous symbolic structure without modifying the structural elements themselves.
type: mathematica
gofPattern: Visitor
gofCategory: Behavioral
arcaneSchool: "Divination // Examination"
formula: |2
  (* The Elements (Runes) *)
  ClearAll[FireRune, IceRune, LightningRune];

  (* The Visitor Functionality utilizing Mathematica's powerful ReplaceAll and Pattern Matching *)
  (* Instead of an explicit Accept method, we use symbolic traversal *)

  (* Visitor 1: Power Evaluator *)
  EvaluatePower = {
    FireRune[intensity_] :> intensity * 2,
    IceRune[density_] :> density * 1.5,
    LightningRune[voltage_] :> voltage * 3
  };

  (* Visitor 2: Element Counter *)
  CountElements = {
    FireRune[_] :> (fireCount++; 1),
    IceRune[_] :> (iceCount++; 1),
    LightningRune[_] :> (lightningCount++; 1)
  };

  (* Usage *)
  grimoireStructure = {FireRune[5], IceRune[10], {FireRune[2], LightningRune[8]}};

  (* Applying Visitor 1 using MapAll/ReplaceAll *)
  totalPower = Total[grimoireStructure /. EvaluatePower, Infinity];
  Print["Total Arcane Power: ", totalPower];

  (* Applying Visitor 2 *)
  fireCount = 0; iceCount = 0; lightningCount = 0;
  grimoireStructure /. CountElements;
  Print["Fire Runes: ", fireCount, ", Ice Runes: ", iceCount, ", Lightning Runes: ", lightningCount];
tags: [visitor, behavioral, replaceall, pattern-matching]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---
