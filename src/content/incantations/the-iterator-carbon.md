---
title: "The Iterator Incantation in Carbon"
description: "Traverse the elements of a complex data matrix without exposing its underlying architecture."
type: carbon
gofPattern: Iterator
gofCategory: Behavioral
arcaneSchool: "Divination // Scrying"
formula: |2
  package IteratorPattern api;

  interface Iterator {
    fn HasNext[me: Self]() -> bool;
    fn Next[addr me: Self*]() -> String;
  }

  interface Collection {
    fn CreateIterator[me: Self]() -> auto;
  }

  class NodeList {
    var nodes: String; // conceptual
    var count: i32;

    impl as Collection {
      fn CreateIterator[me: Self]() -> auto {
        // Return concrete iterator
        return NodeIterator({.list = &me, .index = 0});
      }
    }
  }

  class NodeIterator {
    var list: NodeList*;
    var index: i32;

    impl as Iterator {
      fn HasNext[me: Self]() -> bool {
        return me.index < (*me.list).count;
      }
      fn Next[addr me: Self*]() -> String {
        (*me).index += 1;
        return "Node Data"; 
      }
    }
  }
tags: [behavioral, carbon, traversal]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

# The Iterator: Scrying the Matrix

Whether exploring an array, a linked list, or a deep binary tree of corrupted data fragments, exposing the exact data structure to the client is a violation of encapsulation. The Iterator pattern provides a standard `HasNext` and `Next` interface for scrying into the void.

Carbon brings sanity to traversal. Gone are the days of fragile pointer arithmetic leading to out-of-bounds segfaults. By implementing an `Iterator`, you decouple the algorithms that process data from the containers that hold it, perfectly aligning with the modular philosophy of the Successor Pact.
