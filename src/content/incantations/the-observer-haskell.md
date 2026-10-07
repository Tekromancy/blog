---
title: The Observer
description: FRP and reactive conduits to react to the changing void.
type: haskell
gofPattern: Observer
gofCategory: Behavioral
arcaneSchool: "Divination // Reactive"
formula: |2
  module Observer where
  type Observer = String -> IO ()
  notify :: [Observer] -> String -> IO ()
  notify obs msg = mapM_ ($ msg) obs
tags: [observer, frp, behavioral]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
