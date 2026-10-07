---
title: "The Builder: Structuring Parallel Grids"
description: "Iteratively stack parameters to manifest massive computations on the GPU."
type: futhark
gofPattern: Builder
gofCategory: Creational
arcaneSchool: "Transmutation // Synthesis"
formula: |2
  type builder = { power: i32, sigils: i32 }
  
  let init_builder = { power = 0, sigils = 0 }
  
  let add_power (b: builder) (p: i32) = b with power = b.power + p
  
  let add_sigil (b: builder) = b with sigils = b.sigils + 1
  
  let manifest (b: builder) = b.power * b.sigils
tags: [futhark, builder, records]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
