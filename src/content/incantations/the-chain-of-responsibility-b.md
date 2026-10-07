---
title: "The Chain of Responsibility"
description: "Passing the primordial burden down a sequence of arcane handlers."
type: b
gofPattern: Chain of Responsibility
gofCategory: Behavioral
arcaneSchool: Enchantment // Compulsion
formula: |
  /* Handlers are linked lists of function pointers and next pointers */
  /* Node: [handler_func, next_node] */
  
  handle_fire(req, next) {
      if (req == 'FIRE') putchar('F');
      else if (next) (next[0])(req, next[1]);
  }
  
  handle_ice(req, next) {
      if (req == 'ICE') putchar('I');
      else if (next) (next[0])(req, next[1]);
  }
  
  resolve() {
      auto ice_node[2];
      auto fire_node[2];
      
      ice_node[0] = handle_ice;
      ice_node[1] = 0; /* Null terminator */
      
      fire_node[0] = handle_fire;
      fire_node[1] = ice_node; /* Point to ice node */
      
      /* Send burden down the chain */
      (fire_node[0])('ICE', fire_node[1]);
  }
tags: [b, design-pattern, precursor, bell-labs-magic, untyped]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---
