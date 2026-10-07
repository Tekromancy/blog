---
title: The Primordial Prototype
description: Cloning pre-existing soul-matrices instead of invoking new ones from the void.
type: c
gofPattern: Prototype
gofCategory: Creational
arcaneSchool: "Necromancy // Cloning"
formula: |2
  #include <stdio.h>
  #include <stdlib.h>
  #include <string.h>

  typedef struct SoulMatrix SoulMatrix;
  struct SoulMatrix {
      char true_name[64];
      int essence;
      SoulMatrix* (*clone)(const SoulMatrix* self);
  };

  SoulMatrix* clone_matrix(const SoulMatrix* self) {
      SoulMatrix* new_matrix = malloc(sizeof(SoulMatrix));
      memcpy(new_matrix, self, sizeof(SoulMatrix));
      // Deep copy logic would reside here if pointers existed internally.
      return new_matrix;
  }

  SoulMatrix* create_base_matrix(const char* name, int essence) {
      SoulMatrix* m = malloc(sizeof(SoulMatrix));
      strncpy(m->true_name, name, 63);
      m->essence = essence;
      m->clone = clone_matrix;
      return m;
  }

  int main() {
      SoulMatrix* original = create_base_matrix("Void Walker", 100);
      
      SoulMatrix* replica1 = original->clone(original);
      SoulMatrix* replica2 = original->clone(original);
      
      printf("Clone 1: %s (Essence %d)\n", replica1->true_name, replica1->essence);
      
      free(original);
      free(replica1);
      free(replica2);
      return 0;
  }
tags: [c, creational, prototype, cloning]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

When the cost of forging a new soul from the ether is too great, the Primordial Prototype provides a mechanism to mirror an existing construct. In C, this is manifested as a `clone` function pointer that duplicates the memory topology of the entity.
