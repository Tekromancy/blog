---
title: "The Visitor: Wandering Spirits"
description: "Separating algorithms from the object structure of the multiverse."
type: "r"
gofPattern: "Visitor"
gofCategory: "Behavioral"
arcaneSchool: "Divination // Astral Projection"
formula: |
  library(R6)

  # Visitor Interface
  SpiritVisitor <- R6Class("SpiritVisitor",
    public = list(
      visit_node = function(node) stop("Not implemented"),
      visit_leaf = function(leaf) stop("Not implemented")
    )
  )

  # Concrete Visitor
  CorruptionScanner <- R6Class("CorruptionScanner", inherit = SpiritVisitor,
    public = list(
      visit_node = function(node) {
        "Scanning Fate Node for corruption."
      },
      visit_leaf = function(leaf) {
        "Scanning Omen Leaf for corruption."
      }
    )
  )

  # Elements
  FateElement <- R6Class("FateElement",
    public = list(
      accept = function(visitor) stop("Not implemented")
    )
  )

  FateNode <- R6Class("FateNode", inherit = FateElement,
    public = list(
      accept = function(visitor) {
        visitor$visit_node(self)
      }
    )
  )

  OmenLeaf <- R6Class("OmenLeaf", inherit = FateElement,
    public = list(
      accept = function(visitor) {
        visitor$visit_leaf(self)
      }
    )
  )
tags: ["R6", "Divination", "Behavioral", "Visitor"]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

Spirits traverse the Fate Tree, performing operations like Corruption Scanning without needing to add scanning logic directly to the nodes themselves.
