---
title: The Proxy of Web Runes
description: Provide a magical ward or placeholder for a deeply hidden web rune.
type: purescript
gofPattern: Proxy
gofCategory: Structural
arcaneSchool: "Abjuration // Ward Enforcement"
formula: |2
  module Arcane.Proxy where
  import Prelude
  import Effect (Effect)
  import Effect.Console (log)

  type ForbiddenLibrary = { accessTome :: String -> Effect Unit }

  realLibrary :: ForbiddenLibrary
  realLibrary = { accessTome: \tome -> log $ "Reading true secrets of: " <> tome }

  -- Security Proxy
  proxyLibrary :: String -> ForbiddenLibrary
  proxyLibrary password =
    { accessTome: \tome ->
        if password == "Shibboleth"
        then realLibrary.accessTome tome
        else log "Access Denied by the Astral Ward."
    }
tags: [structural, proxy, purescript, runes]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
