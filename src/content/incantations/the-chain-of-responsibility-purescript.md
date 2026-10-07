---
title: The Chain of Responsibility of Web Runes
description: Pass arcane requests along a chain of magical wards until one handles it.
type: purescript
gofPattern: Chain of Responsibility
gofCategory: Behavioral
arcaneSchool: "Abjuration // Spell Deflection"
formula: |2
  module Arcane.ChainOfResponsibility where
  import Prelude
  import Data.Maybe (Maybe(..))
  import Data.List (List(..))

  type Request = { spellType :: String, payload :: String }
  type Handler = Request -> Maybe String

  handleLowLevel :: Handler
  handleLowLevel req =
    if req.spellType == "Cantrip"
    then Just $ "Apprentice handled: " <> req.payload
    else Nothing

  handleMidLevel :: Handler
  handleMidLevel req =
    if req.spellType == "Hex"
    then Just $ "Warlock handled: " <> req.payload
    else Nothing

  -- Compose the chain
  chain :: List Handler -> Handler
  chain Nil _ = Nothing
  chain (Cons h rest) req = case h req of
    Just res -> Just res
    Nothing -> chain rest req
tags: [behavioral, chain-of-responsibility, purescript, runes]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
