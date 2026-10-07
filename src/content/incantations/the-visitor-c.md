---
title: The Primordial Visitor
description: An ethereal spirit traversing the nodes of reality, applying context-specific transmutations.
type: c
gofPattern: Visitor
gofCategory: Behavioral
arcaneSchool: "Transmutation // Astral Projection"
formula: |2
  #include <stdio.h>

  typedef struct SpiritVisitor SpiritVisitor;

  // Elements
  typedef struct {
      void (*accept)(void* self, SpiritVisitor* visitor);
  } Element;

  typedef struct {
      Element base;
      int heat_level;
  } FireNode;

  typedef struct {
      Element base;
      int chill_level;
  } IceNode;

  // Visitor
  struct SpiritVisitor {
      void (*visit_fire)(SpiritVisitor* self, FireNode* node);
      void (*visit_ice)(SpiritVisitor* self, IceNode* node);
  };

  // Implementations
  void fire_accept(void* self, SpiritVisitor* v) { v->visit_fire(v, (FireNode*)self); }
  void ice_accept(void* self, SpiritVisitor* v) { v->visit_ice(v, (IceNode*)self); }

  void drain_fire(SpiritVisitor* self, FireNode* node) {
      printf("Draining %d heat from Fire Node!\n", node->heat_level);
  }
  void melt_ice(SpiritVisitor* self, IceNode* node) {
      printf("Melting Ice Node of chill %d!\n", node->chill_level);
  }

  int main() {
      FireNode f = { { fire_accept }, 500 };
      IceNode i = { { ice_accept }, -300 };
      
      SpiritVisitor drainer = { drain_fire, melt_ice };
      
      f.base.accept(&f, &drainer);
      i.base.accept(&i, &drainer);
      
      return 0;
  }
tags: [c, behavioral, visitor, double-dispatch]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---

When the structure of a runic tree is sacrosanct, the Primordial Visitor walks its branches. Utilizing double dispatch via `accept` and `visit` function pointers, the Spirit Visitor safely manipulates the elements without altering their core structural bindings.
