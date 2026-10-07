---
title: The Builder Incantation
description: Step-by-step assembly of complex symbolic expressions through transformation rules.
type: mathematica
gofPattern: Builder
gofCategory: Creational
arcaneSchool: "Transmutation // Constructmancy"
formula: |2
  (* The Base Construct *)
  ClearAll[Golem, AddHead, AddTorso, AddLimbs, Animate];

  (* Step-by-step Builders returning an updated expression *)
  AddHead[material_][golem_] := Append[golem, Head -> material];
  AddTorso[material_][golem_] := Append[golem, Torso -> material];
  AddLimbs[material_][golem_] := Append[golem, Limbs -> material];

  Animate[golem_] := Prepend[golem, Status -> "Animated"];

  (* The Director Ritual using Composition *)
  BuildClayGolem = RightComposition[
    AddHead["Clay"],
    AddTorso["Clay"],
    AddLimbs["Clay"],
    Animate
  ];

  BuildIronGolem = RightComposition[
    AddHead["Iron"],
    AddTorso["Iron"],
    AddLimbs["Iron"],
    Animate
  ];

  (* Usage *)
  baseGolem = {Name -> "Nameless"};
  clayGolem = BuildClayGolem[baseGolem];
  ironGolem = BuildIronGolem[baseGolem];

  Print[clayGolem];
  Print[ironGolem];
tags: [creation, assembly, composition, symbols]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
