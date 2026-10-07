---
title: The Composite of the Shortened Breath
description: A fractal nested arrangement of spells.
type: golfscript
gofPattern: Composite
gofCategory: Structural
arcaneSchool: "Illusion // Fractal"
formula: |2
  # Composite
  # A tree of arrays evaluated recursively
  [ 1 [2 3] 4 ] { . []= { ~ } * } * # Flatten
tags: [structural, golfscript, the-shortened-breath]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---
