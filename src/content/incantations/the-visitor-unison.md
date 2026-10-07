---
title: The Visitor
description: Represent an operation to be performed on the elements of an object structure.
type: unison
gofPattern: Visitor
gofCategory: Behavioral
arcaneSchool: "Divination // Structural Scrying"
formula: |2
  structural type Node = 
    Scroll Text |
    Tome [Node]
    
  type Visitor a = {
    visitScroll : Text -> a,
    visitTome : [a] -> a
  }
  
  accept : Visitor a -> Node -> a
  accept v = cases
    Scroll t -> Visitor.visitScroll v t
    Tome nodes -> 
      results = List.map (accept v) nodes
      Visitor.visitTome v results
      
  wordCountVisitor : Visitor Nat
  wordCountVisitor = Visitor
    (t -> Text.size t)
    (ns -> List.foldLeft (+) 0 ns)
tags: [behavioral, visitor, unison, folds, recursion]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---

The Visitor pattern allows a mage to define new operations over an arcane structure without altering the structure's fundamental geometry. In Unison, this is elegantly achieved through a catamorphism (a fold) over the algebraic data type. By defining a `Visitor` record that contains a function for each constructor of the data type, `accept` recursively applies the visitor, transmuting the entire tree into a finalized result.
