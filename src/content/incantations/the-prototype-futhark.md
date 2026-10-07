---
title: "The Prototype: Cloning the Memory Space"
description: "Duplicate entire vector spaces seamlessly across the VRAM void."
type: futhark
gofPattern: Prototype
gofCategory: Creational
arcaneSchool: "Transmutation // Synthesis"
formula: |2
  let clone_array [n] (arr: [n]i32) : *[n]i32 =
    copy arr
  
  let modify_clone [n] (arr: *[n]i32) (i: i64) (v: i32) : *[n]i32 =
    arr with [i] = v
tags: [futhark, prototype, cloning]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
