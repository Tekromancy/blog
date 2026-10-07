---
title: Facade in Dhall
description: Provide a unified, simplified invocation surface for a myriad of complex magical subsystems.
type: dhall
gofPattern: Facade
gofCategory: Structural
arcaneSchool: "Illusion // Simplification"
formula: |2
  let ManaSys = { tap : Natural -> Text }
  let SpellSys = { cast : Text -> Text }
  
  let makeFacade =
        \(m : ManaSys) ->
        \(s : SpellSys) ->
          { quickCast =
              \(cost : Natural) ->
                s.cast (m.tap cost)
          }
  
  in  makeFacade { tap = \(n : Natural) -> "Mana Drawn" } { cast = \(t : Text) -> "Boom!" }
tags: [dhall, halting, runes, configuration, structural]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

When interacting with deep, sprawling configuration ecosystems, the **Facade** pattern provides a crucial simplification boundary. By bundling references to complex subsystem modules within a single record, an Adept exposes only the most highly-trafficked, straightforward incantations to the outside configuration file, abstracting away the halting-safe chaos within.
