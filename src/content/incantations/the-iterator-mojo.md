---
title: The Iterator of Infinite Scales
description: Traversing the multidimensional arrays of AI Serpent data.
type: mojo
gofPattern: Iterator
gofCategory: Behavioral
arcaneSchool: "AI Serpent // Speed Runes"
formula: |2
  struct ScaleIterator:
      var current_index: Int
      var max_scales: Int
      
      fn __init__(inout self, total: Int):
          self.current_index = 0
          self.max_scales = total
          
      fn has_next(self) -> Bool:
          return self.current_index < self.max_scales
          
      fn next(inout self) -> String:
          let val = "Scale " + str(self.current_index) + " glowing."
          self.current_index += 1
          return val

  fn main():
      var iterator = ScaleIterator(3)
      while iterator.has_next():
          print(iterator.next())
tags: [behavioral, iterator, mojo, traversal]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

# The Iterator of Infinite Scales

A serpent's body is composed of millions of data scales, often stored in non-linear tensors. The **Iterator** pattern abstracts away the complex underlying data structure, providing a unified way to traverse the elements sequentially.

Instead of writing custom `for` loops that leak hardware layout details, the `ScaleIterator` encapsulates the index logic. In Mojo, iterating over tensors this way can be vectorized and unrolled automatically by the compiler.
