---
title: The Observer of Web Runes
description: Establish a reactive aether subscription mechanism to notify dependent wards.
type: purescript
gofPattern: Observer
gofCategory: Behavioral
arcaneSchool: "Divination // Scrying Network"
formula: |2
  module Arcane.Observer where
  import Prelude
  import Effect (Effect)
  import Effect.Console (log)
  import Effect.Ref as Ref
  import Data.Array (snoc)
  import Data.Foldable (traverse_)

  type Observer = String -> Effect Unit
  type Subject = { observers :: Ref.Ref (Array Observer) }

  createCrystalBall :: Effect Subject
  createCrystalBall = do
    ref <- Ref.new []
    pure { observers: ref }

  scry :: Subject -> Observer -> Effect Unit
  scry sub obs = Ref.modify_ (\arr -> snoc arr obs) sub.observers

  visionReceived :: Subject -> String -> Effect Unit
  visionReceived sub vision = do
    obs <- Ref.read sub.observers
    traverse_ (\o -> o vision) obs
tags: [behavioral, observer, purescript, runes]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
