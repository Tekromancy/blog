---
title: The Singleton
description: A mathematically unbreakable global ward, enforced by the type system.
type: haskell
gofPattern: Singleton
gofCategory: Creational
arcaneSchool: Abjuration // Type-Theory
formula: |
  {-# LANGUAGE DataKinds, GADTs #-}
  module Singleton where
  data WorldState = Active | Dormant
  data SWorldState (s :: WorldState) where SActive :: SWorldState 'Active
  
  invokeActiveWard :: SWorldState 'Active -> String
  invokeActiveWard SActive = "The Active Ward is invoked."
tags: [singleton, types, abjuration]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
