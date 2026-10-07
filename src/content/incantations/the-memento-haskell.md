---
title: The Memento
description: Capturing the state of the universe at a point in time, made trivial by immutability.
type: haskell
gofPattern: Memento
gofCategory: Behavioral
arcaneSchool: Chronomancy // Storage
formula: |
  module Memento where
  data State = State Int String deriving (Show, Eq)
  saveState :: State -> State
  saveState = id -- Immortality via immutability
tags: [memento, state, chronomancy]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
