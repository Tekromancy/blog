---
title: The Iterator of Mystic Collections
description: Provide a way to access the elements of an aggregate object sequentially without exposing its underlying representation in Move.
type: move
gofPattern: Iterator
gofCategory: Behavioral
arcaneSchool: "Divination // Chronomancy"
formula: |2
  module arcane::iterator {
      use std::vector;
  
      struct Iterator<T> has drop {
          collection: vector<T>,
          index: u64,
      }
  
      public fun new<T>(collection: vector<T>): Iterator<T> {
          Iterator { collection, index: 0 }
      }
  
      public fun has_next<T>(iter: &Iterator<T>): bool {
          iter.index < vector::length(&iter.collection)
      }
  
      public fun next<T: copy>(iter: &mut Iterator<T>): T {
          let item = *vector::borrow(&iter.collection, iter.index);
          iter.index = iter.index + 1;
          item
      }
  }
tags: [behavioral, iterator, move, vectors, collections]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
