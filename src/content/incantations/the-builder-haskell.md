---
title: The Builder
description: Assembling complex wards through pure composable state transformations.
type: haskell
gofPattern: Builder
gofCategory: Creational
arcaneSchool: Transmutation // Abjuration
formula: |
  module Builder where
  import Control.Monad.State
  
  data Golem = Golem { headType :: String, bodyType :: String } deriving Show
  type GolemBuilder = State Golem ()
  
  buildHead :: String -> GolemBuilder
  buildHead h = modify (\g -> g { headType = h })
  
  buildBody :: String -> GolemBuilder
  buildBody b = modify (\g -> g { bodyType = b })
tags: [state-monad, builder, transmutation]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
