---
title: The Primordial Composite
description: Treating individual sigils and immense runic matrices uniformly.
type: c
gofPattern: Composite
gofCategory: Structural
arcaneSchool: "Illusion // Phantasm"
formula: |2
  #include <stdio.h>
  #include <stdlib.h>
  #include <string.h>

  typedef struct RuneNode RuneNode;
  struct RuneNode {
      char name[32];
      void (*activate)(RuneNode* self, int depth);
      RuneNode** children;
      int child_count;
      int capacity;
  };

  void activate_rune(RuneNode* self, int depth) {
      for(int i = 0; i < depth; i++) printf("-");
      printf(" %s\n", self->name);
      for(int i = 0; i < self->child_count; i++) {
          self->children[i]->activate(self->children[i], depth + 2);
      }
  }

  RuneNode* create_rune(const char* name) {
      RuneNode* node = malloc(sizeof(RuneNode));
      strncpy(node->name, name, 31);
      node->activate = activate_rune;
      node->children = malloc(sizeof(RuneNode*) * 4);
      node->child_count = 0;
      node->capacity = 4;
      return node;
  }

  void add_child(RuneNode* parent, RuneNode* child) {
      if (parent->child_count >= parent->capacity) {
          parent->capacity *= 2;
          parent->children = realloc(parent->children, sizeof(RuneNode*) * parent->capacity);
      }
      parent->children[parent->child_count++] = child;
  }

  void destroy_rune(RuneNode* node) {
      for(int i = 0; i < node->child_count; i++) destroy_rune(node->children[i]);
      free(node->children);
      free(node);
  }

  int main() {
      RuneNode* root = create_rune("Master Glyph");
      RuneNode* branch1 = create_rune("Flame Array");
      RuneNode* leaf1 = create_rune("Spark");
      RuneNode* leaf2 = create_rune("Ember");
      
      add_child(branch1, leaf1);
      add_child(branch1, leaf2);
      add_child(root, branch1);
      
      root->activate(root, 0);
      destroy_rune(root);
      return 0;
  }
tags: [c, structural, composite, recursion]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Primordial Composite forms fractals of power. It allows the archmage to treat individual sigils and sprawling rune arrays through a unified interface. Trees of pointers map the exact configuration in memory.
