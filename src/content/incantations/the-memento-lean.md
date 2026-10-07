---
title: "The Memento"
description: "Capturing the pure mathematical state of a ward so that it may be perfectly restored after an anomalous disruption."
type: lean
gofPattern: Memento
gofCategory: Behavioral
arcaneSchool: "Chronomancy // Restoration"
formula: |2
  namespace MathematicalWards

  structure WardState where
    harmonics : Nat
    integrity : Int
    deriving Repr

  def saveState (w : WardState) : WardState := w

  def restoreState (memento : WardState) : WardState := memento

  def simulateDisruption (w : WardState) : WardState :=
    { w with integrity := w.integrity - 50 }

  def temporalRecovery : WardState :=
    let initial := { harmonics := 432, integrity := 100 : WardState }
    let memento := saveState initial
    let disrupted := simulateDisruption initial
    restoreState memento

  end MathematicalWards
tags: [behavioral, lean4, memento, wards]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
Due to immutability, the Memento pattern in Lean 4 is simply the act of binding an old state to a variable, allowing it to be recalled flawlessly.
