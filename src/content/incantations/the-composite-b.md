---
title: "The Composite"
description: "Treating single precursor runes and trees of runes as identical entities."
type: b
gofPattern: Composite
gofCategory: Structural
arcaneSchool: Illusion // Phantasm
formula: |
  /* Nodes are stored as words: [type, value/left, right] */
  
  /* Leaf node: type=0, val=X */
  make_leaf(val, out) {
      out[0] = 0;
      out[1] = val;
  }
  
  /* Composite node: type=1, left=ptr, right=ptr */
  make_composite(left, right, out) {
      out[0] = 1;
      out[1] = left;
      out[2] = right;
  }
  
  traverse(node) {
      if (node[0] == 0) {
          putchar(node[1]);
      } else {
          traverse(node[1]);
          traverse(node[2]);
      }
  }
tags: [b, design-pattern, precursor, bell-labs-magic, untyped]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---
