---
title: "The Memento Relic"
description: "Capturing and restoring an object's internal state without violating encapsulation."
type: agda
gofPattern: Memento
gofCategory: Behavioral
arcaneSchool: "Chronomancy // Time Reversal"
formula: |2
  module MementoPattern where
  
  open import Data.String
  
  record Memento : Set where
    field state : String
    
  record Originator : Set where
    field
      currentState : String
      save : Memento
      restore : Memento → Originator
tags: ["agda", "memento", "chronomancy"]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
# The Memento Relic

Chronological rollbacks in grid nodes require snapshotting memory. The **Memento Relic** extracts the essence of an object and stores it, safe from tampering, allowing the system to rewind time upon catastrophic failure.

## The Dependent Runes

By saving the internal configuration strictly into an opaque `Memento` type, the external caretaker can hold onto past states without ever parsing or corrupting the data inside.
