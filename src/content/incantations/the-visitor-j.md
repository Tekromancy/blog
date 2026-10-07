---
title: "The Visitor"
description: "An ethereal projection traversing a heterogeneous tree of magical nodes."
type: j
gofPattern: Visitor
gofCategory: Behavioral
arcaneSchool: "Divination // Ethereal Traversal"
formula: |2
  coclass 'NodeA'
  accept =: 3 : 'visit_A__y '''''
  
  coclass 'NodeB'
  accept =: 3 : 'visit_B__y '''''
  
  coclass 'Visitor'
  visit_A =: 3 : '''Visited A'''
  visit_B =: 3 : '''Visited B'''
  
  NB. Traverse a list of nodes
  traverse =: 3 : 0
    'nodes visitor' =. y
    for_n. nodes do.
      accept__n visitor
    end.
  )
tags: [visitor, double-dispatch, objects, traversal]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---

Double dispatch implemented through dynamic locale method calls.
