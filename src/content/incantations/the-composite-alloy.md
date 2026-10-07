---
title: "The Composite: The Recursive Fractal Nodes"
description: "Compose objects into tree structures to represent part-whole hierarchies."
type: alloy
gofPattern: Composite
gofCategory: Structural
arcaneSchool: "Illusion // Fractal-Weaving"
formula: |2
  abstract sig FractalNode {}
  sig SingularNode extends FractalNode {}
  
  sig ClusterNode extends FractalNode {
    children: set FractalNode
  }
  
  fact "The Fractals Shall Not Loop" {
    no c: ClusterNode | c in c.^children
  }
  
  pred valid_tree {
    some ClusterNode
  }
  
  run valid_tree for 5
tags: [structural, composite, trees]
pubDate: 2026-10-07
author: JoshuaালোEdward McLaughlin Cox
difficulty: Archmage
---

# The Composite: The Recursive Fractal Nodes

The essence of the Composite pattern lies in tree structures. In Alloy, we allow `ClusterNode` to contain a set of `FractalNode` elements, which might be clusters themselves. The critical incantation is the fact `The Fractals Shall Not Loop`—utilizing the transitive closure operator `^` to forbid circular containment, keeping reality intact.
