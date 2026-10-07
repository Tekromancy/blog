---
title: "The Factory Method: Spawning GPU Kernels"
description: "Delegate the creation of GPU tasks via sum types and dynamic mappings."
type: futhark
gofPattern: Factory Method
gofCategory: Creational
arcaneSchool: "Transmutation // Synthesis"
formula: |2
  type element = #fire | #ice | #void
  
  let weave (e: element) (intensity: i32) : i32 =
    match e
    case #fire -> intensity * 2
    case #ice -> intensity / 2
    case #void -> 0
tags: [futhark, factory, sum-types]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
