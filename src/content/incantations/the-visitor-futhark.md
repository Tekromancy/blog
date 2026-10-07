---
title: "The Visitor: Structural Transmutation"
description: "Traverse non-uniform structures, mapping disparate effects natively."
type: futhark
gofPattern: Visitor
gofCategory: Behavioral
arcaneSchool: "Divination // Flow"
formula: |2
  type node = #leaf i32 | #branch (i32, i32)
  
  let visit (n: node) : i32 =
    match n
    case #leaf v -> v
    case #branch (l, r) -> l + r
    
  let process_forest [n] (forest: [n]node) : [n]i32 =
    map visit forest
tags: [futhark, visitor, trees]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
