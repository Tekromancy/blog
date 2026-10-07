---
title: The Primordial Abstract Factory
description: Forging related artifacts of the deep metal through distinct metallurgical schools.
type: c
gofPattern: Abstract Factory
gofCategory: Creational
arcaneSchool: "Evocation // Transmutation"
formula: |2
  #include <stdio.h>
  #include <stdlib.h>

  // The Primordial Blueprint demands interfaces via function pointers.
  typedef struct {
      void (*cast)(void);
  } Spell;

  typedef struct {
      void (*bind)(void);
  } Ward;

  typedef struct {
      Spell* (*create_spell)(void);
      Ward* (*create_ward)(void);
  } ArcaneFactory;

  // Fire School Implementation
  void fire_spell_cast(void) { printf("Casting primordial flame!\n"); }
  void fire_ward_bind(void) { printf("Binding a wall of ash.\n"); }

  Spell* create_fire_spell(void) {
      Spell* s = malloc(sizeof(Spell));
      s->cast = fire_spell_cast;
      return s;
  }
  Ward* create_fire_ward(void) {
      Ward* w = malloc(sizeof(Ward));
      w->bind = fire_ward_bind;
      return w;
  }

  ArcaneFactory get_fire_factory(void) {
      ArcaneFactory f = { create_fire_spell, create_fire_ward };
      return f;
  }

  int main() {
      ArcaneFactory factory = get_fire_factory();
      Spell* spell = factory.create_spell();
      Ward* ward = factory.create_ward();
      
      spell->cast();
      ward->bind();
      
      free(spell);
      free(ward);
      return 0;
  }
tags: [c, creational, abstraction, primordial]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Primordial Blueprint utilizes strict memory alignment and function pointers. By exchanging the factory implementation, distinct grimoires (spell and ward families) are instantiated without tightly coupling the caster to the ritual's exact nature.
