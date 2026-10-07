---
title: The Composite in AWK
description: Construct hierarchical data trees within flat associative arrays using SUBSEP.
type: awk
gofPattern: Composite
gofCategory: Structural
arcaneSchool: "Conjuration // Tree-Weaving"
formula: |2
  # Use AWK's multi-dimensional array emulation
  function add_child(parent, child) { 
      tree[parent, ++child_count[parent]] = child 
  }
  
  # Walk the composite structure recursively
  function walk_tree(node, depth,    i, indent) {
      for (i=0; i<depth; i++) indent = indent "  "
      print indent "- " node
      
      for (i = 1; i <= child_count[node]; i++) {
          walk_tree(tree[node, i], depth + 1)
      }
  }
  
  BEGIN { 
      add_child("Root", "Branch1")
      add_child("Root", "Branch2")
      add_child("Branch1", "LeafA")
      add_child("Branch1", "LeafB")
      
      print "Manifesting the Data Tree:"
      walk_tree("Root", 0) 
  }
tags: [awk, text-processing, structural]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---

AWK does not have native references or objects, but its associative arrays combined with the `SUBSEP` variable (`\034`) allow mages to weave complex composite trees and graphs. Recursive functions traverse this flat memory space as if it were a deep forest of linked nodes.
