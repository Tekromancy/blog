---
title: The Memento of Rollback
description: Snapshot transaction state before backout.
type: rexx
gofPattern: Memento
gofCategory: Behavioral
arcaneSchool: "Chronomancy // Time-Weaving"
formula: |2
  /* ooRexx Memento */
  ::class TransactionMemento
  ::attribute state
  ::method init
    use arg state
    self~state = state

  ::class TransactionOriginator
  ::attribute state
  ::method saveState
    return .TransactionMemento~new(self~state)
  ::method restoreState
    use arg memento
    self~state = memento~state
tags: [memento, rollback, rexx]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
Before risking data corruption, the Memento captures a crystalized snapshot of the transaction's soul, enabling a complete backout if the operation fails.
