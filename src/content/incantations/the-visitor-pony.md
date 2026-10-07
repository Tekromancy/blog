---
title: The Visitor Ward
description: Extracting secrets from a hierarchy of nodes.
type: pony
gofPattern: Visitor
gofCategory: Behavioral
arcaneSchool: "Divination // Structural Scrying"
formula: |2
  trait val NodeVisitor
    fun visit_leaf(l: Leaf val)
    fun visit_branch(b: Branch val)

  class val NodePrinter is NodeVisitor
    fun visit_leaf(l: Leaf val) => None // Print logic
    fun visit_branch(b: Branch val) => None
tags: [pony, visitor]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---

## The Visitor Ward

Visitors safely traverse complex data structures, leveraging double dispatch to apply operations on immutable nodes without altering their essence.
