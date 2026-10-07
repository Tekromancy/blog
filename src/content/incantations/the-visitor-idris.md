---
title: "The Visitor: The Astral Auditor"
description: "Separating an algorithm from the object structure on which it operates."
type: idris
gofPattern: Visitor
gofCategory: Behavioral
arcaneSchool: "Divination // Astral-Auditing"
formula: |2
  module Visitor
  
  -- The Elements
  data ArcaneNode = Rune Nat | Crystal String | Glyph Bool
  
  -- The Visitor type
  NodeVisitor : Type -> Type
  NodeVisitor a = ArcaneNode -> a
  
  -- Concrete Visitor (Auditor)
  extractEnergy : NodeVisitor Nat
  extractEnergy (Rune n) = n
  extractEnergy (Crystal _) = 100
  extractEnergy (Glyph _) = 10
  
  -- Apply the visitor across a structure
  auditNetwork : NodeVisitor a -> List ArcaneNode -> List a
  auditNetwork visitor nodes = map visitor nodes
tags: [behavioral, pattern-matching, structure-traversal]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

When a complex network of `ArcaneNode` entities requires auditing, injecting new methods directly into their core destabilizes the matrix. The Visitor pattern extracts the operation—`NodeVisitor`—into an external entity. In Idris, pattern matching is the ultimate Visitor. The compiler under the Theorem Proving Pacts ensures that every variant of the node is exhaustively handled by the auditor, leaving no dark corners in the astral network.
