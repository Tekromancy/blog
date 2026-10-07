---
title: The Decorator Incantation
description: Dynamically augmenting spell behaviors by wrapping functions.
type: mathematica
gofPattern: Decorator
gofCategory: Structural
arcaneSchool: "Transmutation // Enhancement"
formula: |2
  (* Base Spell *)
  BaseHeal[] := {"Heal", 50};

  (* Decorators (Higher-order functions) *)
  Empower[spell_] := Function[
    With[{result = spell[]},
      {result[[1]] <> " (Empowered)", result[[2]] * 1.5}
    ]
  ];

  Extend[spell_] := Function[
    With[{result = spell[]},
      {result[[1]] <> " (Extended)", result[[2]], "Duration: 10s"}
    ]
  ];

  (* Usage *)
  empoweredHeal = Empower[BaseHeal];
  megaHeal = Extend[Empower[BaseHeal]];

  Print["Base: ", BaseHeal[]];
  Print["Empowered: ", empoweredHeal[]];
  Print["Mega: ", megaHeal[]];
tags: [decorator, structural, higher-order, functions]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
