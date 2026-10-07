---
title: Composite in Dhall
description: Represent recursive runic trees using Church encoding to guarantee halting.
type: dhall
gofPattern: Composite
gofCategory: Structural
arcaneSchool: "Conjuration // Arboriculture"
formula: |2
  let Tree =
        forall (Tree : Type) ->
        forall (MakeLeaf : Text -> Tree) ->
        forall (MakeNode : List Tree -> Tree) ->
          Tree
  
  let leaf =
        \(val : Text) ->
        \(Tree : Type) ->
        \(MakeLeaf : Text -> Tree) ->
        \(MakeNode : List Tree -> Tree) ->
          MakeLeaf val
  
  let node =
        \(children : List Tree) ->
        \(Tree : Type) ->
        \(MakeLeaf : Text -> Tree) ->
        \(MakeNode : List Tree -> Tree) ->
          MakeNode children
  
  in  "Composite Tree pattern established using Church Encoding in Dhall"
tags: [dhall, halting, runes, configuration, structural]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---

To preserve its promise of total, guaranteed halting, Dhall forbids naive recursive types. To summon the **Composite** pattern—a naturally recursive tree of configurations—one must rely on arcane Church encoding. This advanced spellwork ensures that leaf parameters and node structures can nest infinitely in theory, yet are mathematically proven to terminate upon evaluation.
