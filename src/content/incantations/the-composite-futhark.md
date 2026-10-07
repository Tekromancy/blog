---
title: "The Composite: Segmented Scan Sorcery"
description: "Treat massive nested data structures identically through segmented operations."
type: futhark
gofPattern: Composite
gofCategory: Structural
arcaneSchool: "Abjuration // Geometry"
formula: |2
  let composite_eval [n] (flags: [n]bool) (vals: [n]i32) : [n]i32 =
    let step (f1: bool, v1: i32) (f2: bool, v2: i32) = 
      (f1 || f2, if f2 then v2 else v1 + v2)
    in (scan step (false, 0) (zip flags vals)).1
tags: [futhark, composite, scan, parallel]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---
