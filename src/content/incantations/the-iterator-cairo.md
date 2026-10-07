---
title: "The Iterator"
description: "Traversing STARK trace matrices seamlessly."
type: cairo
gofPattern: Iterator
gofCategory: Behavioral
arcaneSchool: "Divination // Scrying"
formula: |2
  #[derive(Drop)]
  struct TraceIterator { data: Array<felt252>, index: u32 }
  
  trait IIterator {
      fn next(ref self: TraceIterator) -> Option<felt252>;
  }
  
  impl IteratorImpl of IIterator {
      fn next(ref self: TraceIterator) -> Option<felt252> {
          if self.index < self.data.len() {
              let val = *self.data.at(self.index);
              self.index += 1;
              Option::Some(val)
          } else {
              Option::None
          }
      }
  }
tags: [cairo, design-pattern, iterator]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
Provides a mystical eye to scry sequentially through complex multi-dimensional traces without revealing their true form.
