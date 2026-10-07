---
title: The Abstract Factory of Web Runes
description: Conjure families of related strictly-typed web runes without specifying their concrete manifestations.
type: purescript
gofPattern: Abstract Factory
gofCategory: Creational
arcaneSchool: "Conjuration // Sigilcraft"
formula: |2
  module Arcane.AbstractFactory where
  import Prelude
  import Effect (Effect)
  import Effect.Console (log)

  -- The Abstract Factory is a Record of functions
  type WebRuneFactory =
    { forgeWard  :: String -> String
    , weaveGlyph :: String -> String
    }

  fireRunes :: WebRuneFactory
  fireRunes =
    { forgeWard: \intensity -> "<IgnisWard level='" <> intensity <> "' />"
    , weaveGlyph: \target -> "[FlameGlyph binds " <> target <> "]"
    }

  voidRunes :: WebRuneFactory
  voidRunes =
    { forgeWard: \intensity -> "<NullWard level='" <> intensity <> "' />"
    , weaveGlyph: \target -> "[AbyssGlyph consumes " <> target <> "]"
    }

  invokeRitual :: WebRuneFactory -> Effect Unit
  invokeRitual factory = do
    log $ factory.forgeWard "High"
    log $ factory.weaveGlyph "Demon"
tags: [creational, abstract-factory, purescript, runes]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
