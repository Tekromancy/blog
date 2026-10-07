---
title: The Primordial Iterator
description: Traversing spatial collections without disturbing the underlying ether geometry.
type: c
gofPattern: Iterator
gofCategory: Behavioral
arcaneSchool: "Divination // Scrying"
formula: |2
  #include <stdio.h>
  #include <stdlib.h>

  typedef struct {
      int* array;
      int size;
      int position;
  } RuneCollection;

  // Iterator functions
  int has_next(RuneCollection* collection) {
      return collection->position < collection->size;
  }

  int next(RuneCollection* collection) {
      return collection->array[collection->position++];
  }

  void reset(RuneCollection* collection) {
      collection->position = 0;
  }

  int main() {
      int data[] = {10, 20, 30, 40};
      RuneCollection collection = { data, 4, 0 };
      
      printf("Scrying runes in sequence:\n");
      while(has_next(&collection)) {
          printf("Rune power: %d\n", next(&collection));
      }
      return 0;
  }
tags: [c, behavioral, iterator, traversal]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

Rather than exposing the chaotic memory-blocks of an arcane compendium, the Primordial Iterator offers safe, sequential access. Scrying the layout is handled internally, keeping the caster protected from pointer anomalies.
