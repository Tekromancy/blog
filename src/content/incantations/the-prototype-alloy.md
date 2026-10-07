---
title: "The Prototype: Duplication in the Void"
description: "Specify the kinds of objects to create using a prototypical instance."
type: alloy
gofPattern: Prototype
gofCategory: Creational
arcaneSchool: "Illusion // Duplication"
formula: |2
  abstract sig Engram {
    clone: one Engram
  }
  
  sig NeuralEngram, CyberEngram extends Engram {}
  
  fact "Clones Are Distinct Entities" {
    all e: Engram | e.clone != e
  }
  
  fact "Clones Preserve Identity Types" {
    all e: NeuralEngram | e.clone in NeuralEngram
    all e: CyberEngram | e.clone in CyberEngram
  }
  
  pred duplicate[e: Engram] {
    some e.clone
  }
  
  run duplicate for 4
tags: [creational, prototype, cloning]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

# The Prototype: Duplication in the Void

When duplicating constructs in a pure relational logic framework, we establish a mapping. The `clone` relation connects an `Engram` to another of its exact kind. We must inject facts to enforce that an engram does not clone itself as itself, and that a neural signature does not abruptly become cybernetic upon copying.
