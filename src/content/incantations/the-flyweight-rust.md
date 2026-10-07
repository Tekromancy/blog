---
title: Flyweight of the Data Swarm
description: Use sharing to support large numbers of fine-grained objects efficiently.
type: rust
gofPattern: Flyweight
gofCategory: Structural
arcaneSchool: Conjuration // Optimization
formula: |
  use std::collections::HashMap;
  use std::rc::Rc;

  pub struct TextureState { pub data: String } // Intrinsic state

  pub struct TextureFactory {
      cache: HashMap<String, Rc<TextureState>>,
  }

  impl TextureFactory {
      pub fn new() -> Self { Self { cache: HashMap::new() } }
      pub fn get_texture(&mut self, name: &str) -> Rc<TextureState> {
          self.cache.entry(name.to_string())
              .or_insert_with(|| Rc::new(TextureState { data: format!("{} bytes", name) }))
              .clone()
      }
  }
tags: [structural, flyweight, conjuration, caching]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

When rendering millions of nanites in a Data Swarm, allocating unique memory for every individual's chrome texture will overload the mind's RAM. The Flyweight pattern is the spell of intrinsic sharing.

By caching the shared, immutable properties of these nanites via reference-counted pointers (`Rc` or `Arc`), the swarm only stores the heavyweight data once. The individual nanites merely store their extrinsic coordinates, reducing the arcane payload exponentially.
