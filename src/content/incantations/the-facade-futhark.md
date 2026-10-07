---
title: "The Facade: Orchestrating the GPU Grid"
description: "Mask complex, multi-stage parallel pipelines behind a simple array interface."
type: futhark
gofPattern: Facade
gofCategory: Structural
arcaneSchool: "Abjuration // Geometry"
formula: |2
  let arcane_facade [n] (input: [n]i32) : [n]i32 =
    let step1 = map (* 2) input
    let step2 = scan (+) 0 step1
    let step3 = map (\x -> x % 256) step2
    in step3
tags: [futhark, facade, pipelines]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
