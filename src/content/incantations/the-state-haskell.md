---
title: The State
description: Modeling mutable planes with the State Monad.
type: haskell
gofPattern: State
gofCategory: Behavioral
arcaneSchool: Transmutation // Flux
formula: |
  module StatePattern where
  import Control.Monad.State
  type MachineState = String
  transition :: State MachineState ()
  transition = modify (\s -> s ++ " transitioned")
tags: [state-monad, behavioral]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
