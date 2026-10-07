---
title: "The Mediator: The Nexus Algorithm"
description: "Govern interactions between disparate elements within parallel zipped arrays."
type: futhark
gofPattern: Mediator
gofCategory: Behavioral
arcaneSchool: "Divination // Flow"
formula: |2
  let mediate_exchange [n] (agents_a: [n]i32) (agents_b: [n]i32) : ([n]i32, [n]i32) =
    let interact a b = if a > b then (a - b, b + b) else (a + a, b - a)
    in unzip (map2 interact agents_a agents_b)
tags: [futhark, mediator, zip]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
