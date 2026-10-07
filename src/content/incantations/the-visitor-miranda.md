---
title: The Visitor of the Ancestral Monad
description: Separating an algorithm from the pure object structure on which it operates.
type: miranda
gofPattern: Visitor
gofCategory: Behavioral
arcaneSchool: "Enchantment // Ancestral Monad"
formula: |2
  || Visitor applies pure transformations over algebraic data types.
  
  element ::= MonadNode num | MonadLeaf string
  
  visitor == (num -> string, string -> string)
  
  accept :: visitor -> element -> string
  accept (v_node, v_leaf) (MonadNode n) = v_node n
  accept (v_node, v_leaf) (MonadLeaf s) = v_leaf s
  
  print_visitor :: visitor
  print_visitor = (print_node, print_leaf)
                  where
                    print_node n = "Node: " ++ show n
                    print_leaf s = "Leaf: " ++ s
  
  visit_elements :: [string]
  visit_elements = map (accept print_visitor) [MonadNode 42, MonadLeaf "Pure"]
tags: [miranda, behavioral, visitor, ancestral-monad]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---
