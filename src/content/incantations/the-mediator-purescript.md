---
title: The Mediator of Web Runes
description: Reduce chaotic web dependencies by forcing runes to communicate via a central Leyline Hub.
type: purescript
gofPattern: Mediator
gofCategory: Behavioral
arcaneSchool: "Illusion // Telepathic Nexus"
formula: |2
  module Arcane.Mediator where
  import Prelude
  import Effect (Effect)
  import Effect.Console (log)

  -- Mediator
  type LeylineHub = { broadcast :: String -> String -> Effect Unit }

  createHub :: Effect LeylineHub
  createHub = pure
    { broadcast: \sender msg -> log $ "[" <> sender <> " whispers to the leyline]: " <> msg }

  -- Colleague
  type Mage = { name :: String, hub :: LeylineHub, speak :: String -> Effect Unit }

  registerMage :: String -> LeylineHub -> Mage
  registerMage name hub =
    { name
    , hub
    , speak: \msg -> hub.broadcast name msg
    }
tags: [behavioral, mediator, purescript, runes]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
