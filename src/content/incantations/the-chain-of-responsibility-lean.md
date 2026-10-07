---
title: "The Chain of Responsibility"
description: "Passing a magical anomaly through sequential defensive wards until one naturally resolves the mathematical discrepancy."
type: lean
gofPattern: Chain of Responsibility
gofCategory: Behavioral
arcaneSchool: "Abjuration // Sequences"
formula: |2
  namespace MathematicalWards

  inductive Anomaly where
    | minor
    | severe
    | critical

  def handleMinor : Anomaly → Option String
    | Anomaly.minor => some "Minor anomaly resolved by local geometry."
    | _ => none

  def handleSevere : Anomaly → Option String
    | Anomaly.severe => some "Severe anomaly quarantined by higher calculus."
    | _ => none

  def chain (handlers : List (Anomaly → Option String)) (a : Anomaly) : String :=
    match handlers.findSome? (fun h => h a) with
    | some res => res
    | none => "Catastrophic failure: Anomaly bypassed all wards."

  def wardChain := [handleMinor, handleSevere]

  #eval chain wardChain Anomaly.severe

  end MathematicalWards
tags: [behavioral, lean4, chain-of-responsibility, wards]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
Implemented through a list of handler functions returning `Option`, chained together to lazily evaluate anomalies.
