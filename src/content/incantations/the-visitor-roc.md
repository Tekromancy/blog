---
title: The Visitor of Labyrinths
description: Decoupling algorithms from the magical structures they operate on via double dispatch.
type: roc
gofPattern: Visitor
gofCategory: Behavioral
arcaneSchool: "Abjuration // Geometry"
tags: [fast-functional-wards, roc, visitor, traversal]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
formula: |2
  interface LabyrinthVisitor
      exposes [Node, Visitor, accept]
      imports []

  Node : [
      Trap U64,
      Treasure Str
  ]

  Visitor a : {
      visitTrap : U64 -> a,
      visitTreasure : Str -> a
  }

  accept : Node, Visitor a -> a
  accept = \node, visitor ->
      when node is
          Trap power -> visitor.visitTrap power
          Treasure item -> visitor.visitTreasure item

  # Example Visitor
  descriptionVisitor : Visitor Str
  descriptionVisitor = {
      visitTrap: \power -> "A deadly trap of power ${Num.toStr power}",
      visitTreasure: \item -> "A wondrous treasure: ${item}"
  }
---
