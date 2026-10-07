---
title: "The Singleton: Core of the Parallel Universe"
description: "Define an immutable global artifact binding the execution grid."
type: futhark
gofPattern: Singleton
gofCategory: Creational
arcaneSchool: "Transmutation // Synthesis"
formula: |2
  module Leyline = {
    let essence_core : i32 = 42
    
    let global_grid [n] (x: [n]i32) : [n]i32 =
      map (+ essence_core) x
  }
tags: [futhark, singleton, modules]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
