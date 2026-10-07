---
title: The Proxy of The Gate
description: Controlling access to a high-cost dimensional gate via an intermediary function.
type: roc
gofPattern: Proxy
gofCategory: Structural
arcaneSchool: "Abjuration // Gatekeeping"
tags: [fast-functional-wards, roc, proxy, authorization]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
formula: |2
  interface GateProxy
      exposes [openGate, proxyOpenGate]
      imports []

  # Expensive or secure operation
  openGate : Str -> Str
  openGate = \dimension ->
      "Opening dimensional gate to ${dimension}!"

  # Proxy
  proxyOpenGate : Str, U64 -> Result Str [Unauthorized]
  proxyOpenGate = \dimension, clearanceLevel ->
      if clearanceLevel >= 5 then
          Ok (openGate dimension)
      else
          Err Unauthorized
---
