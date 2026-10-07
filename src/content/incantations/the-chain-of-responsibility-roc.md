---
title: The Chain of Wards
description: Passing magical anomalies through a sequence of protective layers until handled.
type: roc
gofPattern: Chain of Responsibility
gofCategory: Behavioral
arcaneSchool: "Abjuration // Warding"
tags: [fast-functional-wards, roc, chain-of-responsibility]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
formula: |2
  interface WardChain
      exposes [Anomaly, processAnomaly, fireWard, iceWard, voidWard]
      imports []

  Anomaly : { type : [Fire, Ice, Void], intensity : U64 }

  Handler : (Anomaly -> Result Str Anomaly)

  fireWard : Handler
  fireWard = \anomaly ->
      if anomaly.type == Fire then
          Ok "Fire anomaly absorbed by Fire Ward."
      else
          Err anomaly

  iceWard : Handler
  iceWard = \anomaly ->
      if anomaly.type == Ice then
          Ok "Ice anomaly absorbed by Ice Ward."
      else
          Err anomaly

  voidWard : Handler
  voidWard = \anomaly ->
      if anomaly.type == Void then
          Ok "Void anomaly banished by Void Ward."
      else
          Err anomaly

  # The Chain
  processAnomaly : Anomaly -> Str
  processAnomaly = \anomaly ->
      handlers = [fireWard, iceWard, voidWard]
      
      result = List.walkUntil handlers (Err anomaly) \_, handler ->
          when handler anomaly is
              Ok msg -> Break (Ok msg)
              Err a -> Continue (Err a)
              
      when result is
          Ok msg -> msg
          Err _ -> "Anomaly breached all wards!"
---
