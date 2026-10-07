---
title: The Composite Partitioned Dataset
description: Treat individual PDS members and whole Datasets uniformly.
type: rexx
gofPattern: Composite
gofCategory: Structural
arcaneSchool: "Conjuration // Aggregation"
formula: |2
  /* ooRexx Composite */
  ::class DatasetComponent abstract
  ::method getSize abstract

  ::class PDSMember subclass DatasetComponent
  ::attribute size
  ::method init
    use arg size
    self~size = size
  ::method getSize
    return self~size

  ::class PartitionedDataset subclass DatasetComponent
  ::attribute members
  ::method init
    self~members = .array~new()
  ::method add
    use arg member
    self~members~append(member)
  ::method getSize
    total = 0
    do member over self~members
      total = total + member~getSize()
    end
    return total
tags: [composite, pds, rexx]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
By utilizing the Composite pattern, the orchestrator manipulates directories and simple files with the same arcane gestures, simplifying massive operations.
