---
title: The Visitor of the Hypertext Labyrinth
description: Send an ethereal avatar to traverse and perform operations upon heterogeneous labyrinth nodes.
type: twine
gofPattern: Visitor
gofCategory: Behavioral
arcaneSchool: "Divination // Extrospection"
formula: |2
  :: StoryInit
  <<set setup.NodeData = {
    accept: function(visitor) { return visitor.visitData(this); }
  }>>
  <<set setup.NodeTrap = {
    damage: 50,
    accept: function(visitor) { return visitor.visitTrap(this); }
  }>>
  
  <<set setup.AnalyzerVisitor = {
    visitData: function(node) { return "Extracted hidden files."; },
    visitTrap: function(node) { return "Detected lethal ICE! Damage: " + node.damage; }
  }>>
  
  :: Passage
  <<set $currentNode to setup.NodeTrap>>
  Running Analyzer Protocol:
  <<print $currentNode.accept(setup.AnalyzerVisitor)>>
tags: [behavioral, visitor, traversal]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---

The nodes of the Hypertext Labyrinth are fundamentally diverse: data caches, security traps, neural hubs. Attempting to force a single `analyze()` method into every type of node shatters their distinct architectures.

The **Visitor** pattern reverses the flow. The nodes simply implement an `accept(visitor)` method. The Weaver then constructs an `AnalyzerVisitor` that contains the specific logic for each node type (`visitData`, `visitTrap`). When the visitor is passed to the node, the node hands itself over to the visitor, decoupling the operational logic entirely from the labyrinth's structure.
