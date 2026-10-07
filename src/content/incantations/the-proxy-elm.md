---
title: Proxy in Elm
description: Guarding access to pure domain logic via a surrogate function in Elm.
type: elm
gofPattern: Proxy
gofCategory: Structural
arcaneSchool: "Abjuration // Access Control"
formula: |2
  module Proxy exposing (SystemAccess, proxyAccess)
  
  type alias SystemAccess =
      { executeCommand : String -> String }
  
  -- The Real Subject
  coreSystem : SystemAccess
  coreSystem =
      { executeCommand = \cmd -> "Executed: " ++ cmd }
  
  -- The Proxy
  proxyAccess : String -> String -> String
  proxyAccess userClearance cmd =
      if userClearance == "ROOT" then
          coreSystem.executeCommand cmd
      else
          "ACCESS DENIED. Intrusion logged."
tags: [elm, structural, proxy, security, access-control]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
# The Proxy: The ICE Wall

Before a user's intent can reach the vulnerable core logic of the system, it must pass through the Black ICE. The Proxy pattern in Elm acts as a gatekeeper function. It wraps the sensitive execution logic, validating clearance levels, checking rate limits, or caching responses. If the user fails the authentication ritual, the Proxy returns an impenetrable shield of rejection, leaving the underlying architecture perfectly safe.
