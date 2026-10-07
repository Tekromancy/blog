---
title: The Primordial Factory Method
description: Delegating the instantiation of arcane familiars to sub-lineages.
type: c
gofPattern: Factory Method
gofCategory: Creational
arcaneSchool: "Conjuration // Summoning"
formula: |2
  #include <stdio.h>
  #include <stdlib.h>

  typedef struct Familiar Familiar;
  struct Familiar {
      void (*speak)(Familiar* self);
      void (*destroy)(Familiar* self);
  };

  typedef struct {
      Familiar* (*summon)(void);
  } Spawner;

  // Imp implementation
  void imp_speak(Familiar* self) { printf("Kikiki! Fire and brimstone!\n"); }
  void imp_destroy(Familiar* self) { free(self); }

  Familiar* summon_imp(void) {
      Familiar* f = malloc(sizeof(Familiar));
      f->speak = imp_speak;
      f->destroy = imp_destroy;
      return f;
  }

  // Wisp implementation
  void wisp_speak(Familiar* self) { printf("... hummm ...\n"); }
  void wisp_destroy(Familiar* self) { free(self); }

  Familiar* summon_wisp(void) {
      Familiar* f = malloc(sizeof(Familiar));
      f->speak = wisp_speak;
      f->destroy = wisp_destroy;
      return f;
  }

  int main() {
      Spawner infernal_spawner = { summon_imp };
      Spawner ethereal_spawner = { summon_wisp };

      Familiar* f1 = infernal_spawner.summon();
      Familiar* f2 = ethereal_spawner.summon();

      f1->speak(f1);
      f2->speak(f2);

      f1->destroy(f1);
      f2->destroy(f2);
      return 0;
  }
tags: [c, creational, factory, primordial]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Primordial Factory Method defines an interface for summoning constructs, yet defers the actual conjuration to specific spawner matrices. Opaque structs and function pointers form the basis of this deep architecture.
