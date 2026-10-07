---
title: "The Chain of Responsibility: The Cascading Wards"
description: "Passing anomalous requests along a dynamic chain of magical handlers."
type: idris
gofPattern: Chain of Responsibility
gofCategory: Behavioral
arcaneSchool: "Abjuration // Ward-Cascades"
formula: |2
  module ChainOfResponsibility
  
  data ThreatLevel = Low | High | Critical
  
  record Anomaly where
    constructor MkAnomaly
    threat : ThreatLevel
    description : String
  
  -- The Handler type
  Handler : Type
  Handler = Anomaly -> Maybe String
  
  handleLow : Handler
  handleLow (MkAnomaly Low desc) = Just ("Handled by Acolyte: " ++ desc)
  handleLow _ = Nothing
  
  handleHigh : Handler
  handleHigh (MkAnomaly High desc) = Just ("Handled by Magus: " ++ desc)
  handleHigh _ = Nothing
  
  -- Combine handlers into a chain
  chain : List Handler -> Anomaly -> String
  chain [] _ = "Anomaly Unhandled! Evacuate!"
  chain (h :: hs) a = case h a of
                           Just res => res
                           Nothing => chain hs a
tags: [behavioral, handlers, functional-pipelines]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

When an Anomaly breaches the outer firewall, it must be processed. The Chain of Responsibility routes the disturbance through a cascade of specialized wards. In Idris, this is elegantly modeled as a list of pure functions (`Anomaly -> Maybe String`). If a ward cannot banish the threat, it quietly passes the burden to the next link. The Theorem Proving Pacts guarantee the termination of this sequence.
