---
title: "The Iterator: Traversing the Data Void"
description: "Provide a way to access the elements of an aggregate object sequentially without exposing its underlying representation."
type: alloy
gofPattern: Iterator
gofCategory: Behavioral
arcaneSchool: "Divination // Void-Traversal"
formula: |2
  sig DataMote {}
  
  sig DataCluster {
    motes: set DataMote
  }
  
  sig ClusterScanner {
    target: one DataCluster,
    focus: lone DataMote
  }
  {
    focus in target.motes
  }
  
  pred scan_active[s: ClusterScanner] {
    some s.focus
  }
  
  run scan_active for 3
tags: [behavioral, iterator, traversal]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

# The Iterator: Traversing the Data Void

A `ClusterScanner` binds to a `DataCluster` and maintains a relational `focus` on one of its `DataMotes`. While Alloy natively handles sets, modeling an Iterator requires explicit states. In this static snapshot, the scanner is guaranteed to point only to a mote that legally resides within its targeted cluster.
