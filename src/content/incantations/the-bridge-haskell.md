---
title: The Bridge
description: Decoupling abstraction from implementation via higher-kinded types.
type: haskell
gofPattern: Bridge
gofCategory: Structural
arcaneSchool: "Evocation // Bridgemancy"
formula: |2
  module Bridge where
  class Renderer r where renderSquare :: r -> String
  data VectorR = VectorR
  instance Renderer VectorR where renderSquare _ = "Vector Square"
  data Shape r = Square r
  draw (Square r) = renderSquare r
tags: [bridge, hkt, structural]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
