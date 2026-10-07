---
title: Builder in Elm
description: Constructing complex data spells in Elm using the Builder pattern.
type: elm
gofPattern: Builder
gofCategory: Creational
arcaneSchool: "Transmutation // Structuring"
formula: |2
  module Builder exposing (CyberDeck, newDeck, withNeuralLink, withOverclock, build)
  
  type alias CyberDeck =
      { core : String
      , neuralLink : Bool
      , overclocked : Bool
      }
  
  type Builder
      = Builder CyberDeck
  
  newDeck : String -> Builder
  newDeck coreName =
      Builder { core = coreName, neuralLink = False, overclocked = False }
  
  withNeuralLink : Builder -> Builder
  withNeuralLink (Builder deck) =
      Builder { deck | neuralLink = True }
  
  withOverclock : Builder -> Builder
  withOverclock (Builder deck) =
      Builder { deck | overclocked = True }
  
  build : Builder -> CyberDeck
  build (Builder deck) =
      deck
tags: [elm, creational, builder, pure-functions, pipelines]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
# The Builder: Forging the Cyber-Construct

In the immutable realms of Elm, constructing complex entities requires a delicate flow of arcane energy. The Builder pattern is reborn as a series of pure, chainable functions. Utilizing Elm's elegant pipeline operator (`|>`), the alchemist can weave components together, incrementing the power of the `Builder` monoid before finally casting the `build` incantation to materialize the immutable artifact.
