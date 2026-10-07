---
title: Iterator for Sprite Enchantment
description: Traverse a complex constellation of sprite enchantments without exposing the underlying aetheric structure.
type: gml
gofPattern: Iterator
gofCategory: Behavioral
arcaneSchool: "Divination // Sprite Enchantment"
formula: |2
  function EnchantmentCollection(_enchantments) constructor {
      items = _enchantments;
      
      static create_iterator = function() {
          return new EnchantmentIterator(self);
      };
  }
  
  function EnchantmentIterator(_collection) constructor {
      collection = _collection;
      index = 0;
      
      static has_next = function() {
          return index < array_length(collection.items);
      };
      
      static get_next = function() {
          if (has_next()) {
              var item = collection.items[index];
              index++;
              return item;
          }
          return undefined;
      };
  }
tags: [gml, behavioral, iterator]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

Through the Iterator, an apprentice can blindly navigate an arcane grimoire or a tree of particle emitters. They need not understand how the magics are stored—be it arrays, maps, or multidimensional matrices—merely how to extract the next incantation in the sequence.
