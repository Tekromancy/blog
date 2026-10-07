---
title: "The Proxy of the Guardian Ward"
description: "A magical ward that controls access to a powerful, hidden artifact."
type: lua
gofPattern: Proxy
gofCategory: Structural
arcaneSchool: Abjuration // Warding
formula: |
  local TrueGrimoire = {
    read = function() return "Secrets of the Fae Moon revealed." end
  }

  local GrimoireProxy = {}
  GrimoireProxy.__index = GrimoireProxy

  function GrimoireProxy:new(password)
    return setmetatable({ pass = password, grimoire = TrueGrimoire }, self)
  end

  function GrimoireProxy:read(attempt)
    if attempt == self.pass then
      return self.grimoire.read()
    else
      return "The Guardian Ward burns your hand! Access Denied."
    end
  end

  local ward = GrimoireProxy:new("mellon")
  print(ward:read("friend"))
tags: [fae, proxy, security]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

# Proxy

Not every script is worthy of gazing directly into the True Grimoire. The Proxy pattern instantiates a Guardian Ward, intercepting all requests, verifying the symbiotic authority of the caller, and passing the invocation through only if the Fae Moon Glyphs align.
