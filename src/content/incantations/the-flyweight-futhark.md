---
title: "The Flyweight: Shared VRAM Anchors"
description: "Index into immutable shared pools of memory rather than duplicating data."
type: futhark
gofPattern: Flyweight
gofCategory: Structural
arcaneSchool: "Abjuration // Geometry"
formula: |2
  let flyweight_process [n][m] (shared_pool: [m]i32) (indices: [n]i64) : [n]i32 =
    map (\i -> if i >= 0 && i < m then shared_pool[i] else 0) indices
tags: [futhark, flyweight, optimization]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
