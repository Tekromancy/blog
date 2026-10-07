---
title: "The Iterator: Traversal via Reduction"
description: "Collapse matrices across iterative reductions."
type: futhark
gofPattern: Iterator
gofCategory: Behavioral
arcaneSchool: "Divination // Flow"
formula: |2
  let iterate_flux [n] (flux: [n]i32) : i32 =
    reduce (+) 0 (map (\x -> x * x) flux)
tags: [futhark, iterator, reduce]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
