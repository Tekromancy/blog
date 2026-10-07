---
title: Chain of Responsibility in Dhall
description: Pass a request along a chain of functional handlers until one intercepts it.
type: dhall
gofPattern: Chain of Responsibility
gofCategory: Behavioral
arcaneSchool: "Divination // Routing"
formula: |2
  let Request = { level : Natural, payload : Text }
  
  let Handler = Request -> Optional Text
  
  let apprenticeHandler : Handler =
        \(req : Request) ->
          if    Natural/isZero req.level
          then  Some "Apprentice handled: ${req.payload}"
          else  None Text
  
  let masterHandler : Handler =
        \(req : Request) ->
          Some "Master handled: ${req.payload}"
  
  let chain = \(req : Request) ->
        merge
          { Some = \(res : Text) -> res
          , None = masterHandler req
          }
          (apprenticeHandler req)
  
  in  chain { level = 1, payload = "Rune Exception" }
tags: [dhall, halting, runes, configuration, behavioral]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The **Chain of Responsibility** provides a deterministic flow of control. In Dhall, this is implemented cleanly by having functions return an `Optional` type. The chain relies on `merge` expressions to intercept a `None` result from a weaker handler and dynamically pass the request up to the more powerful spells, guaranteeing eventual resolution without infinite loops.
