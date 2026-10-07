---
title: "The Visitor Hex"
description: "Traversing an abstract syntax tree of magical structures."
type: nix
gofPattern: Visitor
gofCategory: Behavioral
arcaneSchool: "Divination // Pure Environment Hexes"
formula: |2
  let
    # Elements (The AST or data structure)
    nodeA = { type = "fire"; damage = 50; };
    nodeB = { type = "ice"; slow = 30; };
    tree = [ nodeA nodeB ];

    # The Visitor
    powerCalculator = node:
      if node.type == "fire" then node.damage * 2
      else if node.type == "ice" then node.slow * 1.5
      else 0;

    # Applying the Visitor (Traversal)
    totalPower = builtins.foldl' (acc: node: acc + (powerCalculator node)) 0 tree;
  in
  totalPower
tags: [behavioral, visitor, nix, ast, traversal]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---

The Visitor pattern separates an algorithm from the object structure on which it operates. By mapping a specific visitor function across deeply nested derivations or configurations, we can extract metrics or generate metadata without altering the underlying structures.
