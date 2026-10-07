---
title: The Primordial Template Method
description: Laying down the skeletal blueprint of a ritual, yielding specific rites to the acolytes.
type: c
gofPattern: Template Method
gofCategory: Behavioral
arcaneSchool: "Necromancy // Rituals"
formula: |2
  #include <stdio.h>

  typedef struct Ritual Ritual;
  struct Ritual {
      void (*prepare_materials)(void);
      void (*chant)(void);
      void (*ignite)(void);
  };

  void perform_ritual(Ritual* rit) {
      printf("Starting the celestial ritual...\n");
      rit->prepare_materials();
      rit->chant();
      rit->ignite();
      printf("Ritual concluded.\n");
  }

  // Zombie Ritual Implementation
  void zombie_prep(void) { printf("Gathering grave dust.\n"); }
  void zombie_chant(void) { printf("Chanting the dirge of awakening.\n"); }
  void zombie_ignite(void) { printf("Sparking the pale green flame.\n"); }

  int main() {
      Ritual raise_dead = { zombie_prep, zombie_chant, zombie_ignite };
      
      perform_ritual(&raise_dead);
      return 0;
  }
tags: [c, behavioral, template-method, inheritance]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Primordial Template Method enforces the cosmic order. The skeletal framework of `perform_ritual` is invariant, ensuring the laws of magic are followed. The specific implementations—the hooks—are provided via a struct of function pointers, determining if the ritual raises a zombie or summons a demon.
