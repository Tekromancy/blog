---
title: Chain of Responsibility in Elm
description: Sequencing event handlers in Elm via a List of fallback functions.
type: elm
gofPattern: Chain of Responsibility
gofCategory: Behavioral
arcaneSchool: "Evocation // Signal Routing"
formula: |2
  module ChainOfResponsibility exposing (RequestHandler, processRequest, buildChain)
  
  -- A handler takes a request and returns either a handled result or Nothing (pass it on)
  type alias RequestHandler =
      String -> Maybe String
  
  authHandler : RequestHandler
  authHandler req =
      if String.startsWith "auth:" req then Just "Authenticated" else Nothing
  
  dbHandler : RequestHandler
  dbHandler req =
      if String.startsWith "db:" req then Just "Queried Database" else Nothing
  
  fallbackHandler : RequestHandler
  fallbackHandler _ =
      Just "Unknown Request Protocol"
  
  buildChain : List RequestHandler
  buildChain =
      [ authHandler, dbHandler, fallbackHandler ]
  
  processRequest : List RequestHandler -> String -> String
  processRequest chain req =
      case chain of
          [] ->
              "Unhandled Error"
              
          handler :: rest ->
              case handler req of
                  Just result ->
                      result
                      
                  Nothing ->
                      processRequest rest req
tags: [elm, behavioral, chain-of-responsibility, functional-lists, pattern-matching]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
# The Chain of Responsibility: The Cascading Filters

When an anomalous signal strikes the application grid, it must be routed to the correct processing node. The Chain of Responsibility in Elm is instantiated not as a web of objects, but as a pure `List` of functions. Each function evaluates the signal, returning a `Maybe` type. Through recursive pattern matching, the signal cascades down the chain until a node successfully consumes it and returns a `Just`, executing the spell.
