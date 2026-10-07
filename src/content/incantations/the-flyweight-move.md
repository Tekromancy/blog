---
title: The Flyweight Glyph Dictionary
description: Use sharing to support large numbers of fine-grained objects efficiently in Move using global storage.
type: move
gofPattern: Flyweight
gofCategory: Structural
arcaneSchool: "Divination // Scribing"
formula: |2
  module arcane::flyweight {
      use std::signer;
      use std::vector;
  
      struct GlyphDictionary has key {
          glyphs: vector<vector<u8>>,
      }
  
      struct GlyphReference has store, drop {
          index: u64,
      }
  
      public fun initialize(account: &signer) {
          move_to(account, GlyphDictionary { glyphs: vector::empty() });
      }
  
      public fun create_reference(index: u64): GlyphReference {
          GlyphReference { index }
      }
  }
tags: [structural, flyweight, move, global-storage]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
