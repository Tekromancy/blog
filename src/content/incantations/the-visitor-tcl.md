---
title: The Visitor
description: Represents a new operation to be performed on the elements of an arcane object structure without changing the classes.
type: tcl
gofPattern: Visitor
gofCategory: Behavioral
arcaneSchool: "Divination // Inspection"
formula: |2
  oo::class create NetworkNode {
      method accept {visitor} { error "Not implemented" }
  }

  oo::class create DataNode {
      superclass NetworkNode
      method accept {visitor} { $visitor visitDataNode [self] }
      method extract {} { return "Raw Cryptocoin" }
  }

  oo::class create SecurityNode {
      superclass NetworkNode
      method accept {visitor} { $visitor visitSecurityNode [self] }
      method disarm {} { return "ICE Disarmed" }
  }

  oo::class create HackVisitor {
      method visitDataNode {node} { puts "Siphoning: [$node extract]" }
      method visitSecurityNode {node} { puts "Bypassing: [$node disarm]" }
  }

  set nodes [list [DataNode new] [SecurityNode new]]
  set hacker [HackVisitor new]

  foreach node $nodes {
      $node accept $hacker
  }
tags: [behavioral, visitor, inspection, structures]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---

# The Visitor

When navigating a complex hierarchy of disparate nodes, adding a new spell to every node class violates the sacred tenets of encapsulation. The Visitor travels through the matrix like a phantom, shifting its behavior gracefully depending on the specific type of node it encounters, separating the logic from the structure.
