---
title: "The Visitor Apparition"
description: "Separating an algorithm from the object structure on which it operates."
type: agda
gofPattern: Visitor
gofCategory: Behavioral
arcaneSchool: "Necromancy // Astral Projection"
formula: |2
  module VisitorPattern where
  
  open import Data.String
  
  data Element : Set where
    NodeA : String → Element
    NodeB : String → Element
    
  record Visitor (R : Set) : Set where
    field
      visitA : String → R
      visitB : String → R
      
  accept : {R : Set} → Element → Visitor R → R
  accept (NodeA s) v = Visitor.visitA v s
  accept (NodeB s) v = Visitor.visitB v s
tags: ["agda", "visitor", "astral"]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---
# The Visitor Apparition

When inspecting a sprawling AST or physical network architecture, adding a new diagnostic spell directly to the structures poisons their purity. The **Visitor Apparition** separates the logic from the structure.

## The Dependent Runes

By defining an `accept` function, elements open themselves to arbitrary `Visitor` logic. With dependent types, we ensure the visitor must exhaustively handle every possible element variation (`NodeA`, `NodeB`) or fail to compile.
