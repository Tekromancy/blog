---
title: Visitor in Elm
description: Extending functionality over a Custom Type via exhaustive pattern matching.
type: elm
gofPattern: Visitor
gofCategory: Behavioral
arcaneSchool: "Divination // Structure Traversal"
formula: |2
  module Visitor exposing (ASTNode(..), countNodes, extractText)
  
  type ASTNode
      = TextNode String
      | ElementNode String (List ASTNode)
  
  -- Visitor 1: Counting the nodes
  countNodes : ASTNode -> Int
  countNodes node =
      case node of
          TextNode _ ->
              1
              
          ElementNode _ children ->
              1 + List.sum (List.map countNodes children)
              
  -- Visitor 2: Extracting all text
  extractText : ASTNode -> String
  extractText node =
      case node of
          TextNode text ->
              text
              
          ElementNode _ children ->
              String.join " " (List.map extractText children)
tags: [elm, behavioral, visitor, pattern-matching, recursion, ast]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---
# The Visitor: The Astral Projection

The object-oriented Visitor pattern separates algorithms from the object structures they operate on via double-dispatch. In Elm, this is completely natively handled by Custom Types and exhaustive pattern matching. A function (the "Visitor") simply takes the root type (`ASTNode`) and pattern matches across all variants. If a new Visitor is needed—say, to extract text rather than count nodes—a new pure function is written without modifying the underlying data structures at all.
