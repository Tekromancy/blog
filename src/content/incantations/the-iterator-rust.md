---
title: Iterator of the Ley-Line Walker
description: Provide a way to access the elements of an aggregate object sequentially without exposing its underlying representation.
type: rust
gofPattern: Iterator
gofCategory: Behavioral
arcaneSchool: "Divination // Pathfinding"
formula: |2
  pub struct LeyLine { nodes: Vec<String> }

  pub struct LeyLineIterator<'a> {
      line: &'a LeyLine,
      index: usize,
  }

  impl<'a> Iterator for LeyLineIterator<'a> {
      type Item = &'a String;
      fn next(&mut self) -> Option<Self::Item> {
          if self.index < self.line.nodes.len() {
              let result = &self.line.nodes[self.index];
              self.index += 1;
              Some(result)
          } else {
              None
          }
      }
  }

  impl LeyLine {
      pub fn iter(&self) -> LeyLineIterator {
          LeyLineIterator { line: self, index: 0 }
      }
  }
tags: [behavioral, iterator, divination, traversal]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

To traverse the sprawling topology of data is to walk the ley-lines. The Iterator pattern grants the cyber-mage a Pathfinding sense, allowing them to iterate sequentially through any collection without needing to comprehend the intricate tree, graph, or list structure underneath.

Rust elevates the Iterator to divine status, providing an interface so fundamentally woven into the language that the compiler unrolls and optimizes the path into seamless, zero-cost operations.
