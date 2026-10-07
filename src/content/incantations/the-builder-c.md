---
title: The Primordial Builder
description: Step-by-step assembly of complex runic matrices.
type: c
gofPattern: Builder
gofCategory: Creational
arcaneSchool: "Conjuration // Artifice"
formula: |2
  #include <stdio.h>
  #include <stdlib.h>
  #include <string.h>

  typedef struct {
      char core[32];
      char binding[32];
      int power_level;
  } Golem;

  typedef struct {
      Golem* golem;
  } GolemBuilder;

  GolemBuilder* builder_create(void) {
      GolemBuilder* b = malloc(sizeof(GolemBuilder));
      b->golem = malloc(sizeof(Golem));
      memset(b->golem, 0, sizeof(Golem));
      return b;
  }

  void builder_set_core(GolemBuilder* b, const char* core) {
      strncpy(b->golem->core, core, 31);
  }

  void builder_set_binding(GolemBuilder* b, const char* bind) {
      strncpy(b->golem->binding, bind, 31);
  }

  void builder_set_power(GolemBuilder* b, int power) {
      b->golem->power_level = power;
  }

  Golem* builder_build(GolemBuilder* b) {
      Golem* g = b->golem;
      free(b); // Consumes the builder
      return g;
  }

  int main() {
      GolemBuilder* b = builder_create();
      builder_set_core(b, "Obsidian Heart");
      builder_set_binding(b, "Soul Thread");
      builder_set_power(b, 9000);
      
      Golem* my_golem = builder_build(b);
      printf("Golem awake: %s core, %d power.\n", my_golem->core, my_golem->power_level);
      
      free(my_golem);
      return 0;
  }
tags: [c, creational, builder, primordial]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

Instead of overwhelming constructor functions with dozens of esoteric parameters, the Builder abstracts the chaotic formation of arcane artifacts. The builder state holds an incomplete entity until `builder_build` fuses it into existence.
