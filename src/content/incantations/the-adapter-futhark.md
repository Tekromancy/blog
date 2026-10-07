---
title: "The Adapter: Shaping the Memory Leylines"
description: "Morph linear tensor streams into higher-dimensional domains."
type: futhark
gofPattern: Adapter
gofCategory: Structural
arcaneSchool: "Abjuration // Geometry"
formula: |2
  let adapt_to_grid (rows: i64) (cols: i64) (stream: []i32) : [rows][cols]i32 =
    unflatten rows cols stream
tags: [futhark, adapter, arrays]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
