---
title: "The Decorator: Functional Resonance"
description: "Layer computations without state mutation via higher-order functions."
type: futhark
gofPattern: Decorator
gofCategory: Structural
arcaneSchool: "Abjuration // Geometry"
formula: |2
  let with_resonance (f: i32 -> i32) (x: i32) : i32 =
    let result = f x
    in result + (result % 7)
    
  let core_spell (x: i32) = x * 3
  
  let decorated_spell = with_resonance core_spell
tags: [futhark, decorator, functions]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
