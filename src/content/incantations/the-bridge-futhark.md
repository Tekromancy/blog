---
title: "The Bridge: Decoupling Compute Modules"
description: "Abstract parallel implementations from their modular interfaces."
type: futhark
gofPattern: Bridge
gofCategory: Structural
arcaneSchool: "Abjuration // Geometry"
formula: |2
  module type MatrixCore = { val compute : i32 -> i32 }
  
  module CyberCore : MatrixCore = { let compute x = x << 1 }
  
  let execute_bridge (core: (i32 -> i32)) [n] (arr: [n]i32) : [n]i32 =
    map core arr
tags: [futhark, bridge, modules]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
