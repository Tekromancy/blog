---
title: Decorator in ReasonML
description: Function composition to weave new enchantments.
type: reason
gofPattern: Decorator
gofCategory: Structural
arcaneSchool: "Transmutation // Enhancement"
formula: |2
  let castSpell = (name) => "Casting " ++ name;
  let withEcho = (spellFn, name) => spellFn(name) ++ " ... " ++ spellFn(name);

  let echoingCast = withEcho(castSpell);
tags: [reason, decorator, structural]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
Higher-order functions wrap base operations, layering on additional magical effects without mutating the original spell.
